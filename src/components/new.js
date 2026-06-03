/***********************
 * Vsii hoanv Refactor giữ nguyên logic
 * 1. STATE - Input
 ***********************/

var State = (function () {
    return {
        selected: this.getSelectedItem(),
        role: ${curRole_opt}.getData(),
        currentRole: ${current_role}.getData(),
        singleSelect: ${Single_Select1}.getSelectedItem(),
        input: ${nextStep}.getData(),

        isAdj: ${is_adj}.getData(),
        isTsbd: ${is_tsbd}.getData(),
        isThe: ${is_the}.getData(),
        isDC: ${is_DC}.getData(),
        isRMAI: ${is_rmai}.getData(),
        luongThe: ${luong_the}.getData(),

        isDcTsbd: this.ui.getParent().only_ADJ_TSBD(${Data_checkbox}.getData()),
        isDelCol: this.ui.getParent().isDelCol(${Data_checkbox}.getData()),

        roleCaReturn: ${role_ca_return}.getData(),
        deptType: ${DEPT_TYPE}.getData(),

        lastApproval: ${last_approval_select}.getSelectedItem(),
        cbxRMTLChecked: ${cbx_isrmtl}.isChecked()
    };
}).call(this);


/***********************
 * 2. UI HELPER - Show Hide 
 ***********************/
var UI = {
    show: function (el) { el.setVisible(true, false); },
    hide: function (el) { el.setVisible(false, true); },
    enable: function (el) { el.setEnabled(true); },
    disable: function (el) { el.setEnabled(false); }
};


/***********************
 * 3. RULE ENGINE
 ***********************/
var Rule = (function (s) {

    function isHOFlow() {
        return s.selected === 'HO' || s.selected === 'HO_TTKHCNCC';
    }

    function isAMHO() {
        return s.role === 'AM_HO' || s.role === 'AM_HO_PPCC';
    }

    function isRMFlow() {
        return (
            ['DVKD_TD', 'DVKD_KTDRR', 'DVKD_TDRR', 'TTKHCN_CC'].indexOf(s.singleSelect) !== -1 &&
            (s.currentRole === 'RM' || s.currentRole === 'RMAI')
        );
    }

    function hideChiDinhPheDuyet() {
        return s.lastApproval === "CA22" || s.lastApproval === "CA4";
    }

    function shouldCallRouting() {
        if (!s.selected) return false;
        if (isHOFlow() && isAMHO()) return false;
        if (isRMFlow()) return false;
        return true;
    }

    return {
        isHOFlow: isHOFlow,
        isAMHO: isAMHO,
        isRMFlow: isRMFlow,
        hideChiDinhPheDuyet: hideChiDinhPheDuyet,
        shouldCallRouting: shouldCallRouting
    };

})(State);


/***********************
 * 4. BUILD INPUT
 ***********************/
function buildIpEx(s) {

    var ip_ex = s.selected + ',' + s.deptType;

    if (s.roleCaReturn) {
        ip_ex = s.selected + ',' + s.deptType + ',' + s.roleCaReturn;
    }

    if (s.isDC && (s.isTsbd || !s.luongThe)) {
        ip_ex = s.selected + ',' + s.deptType;
    }

    return ip_ex;
}


/***********************
 * 5. WORKFLOW ENGINE
 ***********************/
var Workflow = {

    run: function (s, r) {

        // LOAD ROLE CA 
        if (s.selected) {
            var ip = buildIpEx(s);
            console.log("[LOAD_ROLE_CA]", ip);
            ${load_role_ca}.execute(ip);
        }

        // CALL ROUTING (có điều kiện)
        if (r.shouldCallRouting()) {

            var is_rmtl;
            if (s.isDcTsbd && !s.isDelCol) {
                is_rmtl = ${cbx_isrmtl}.getData();
            } else {
                is_rmtl = ${cbx_isrmtl}.isChecked();
            }

            var payload = JSON.stringify({
                flow: s.selected,
                ODM_Result_AM: "",
                isRMTL: is_rmtl,
                IS_ADJ: s.isDC,
                IS_COL: s.isTsbd,
                IS_RMAI: s.isRMAI,
                isDcTsbd: s.isDcTsbd,
                IS_DEL_COL: s.isDelCol,
                script: "Clean Architecture"
            });

            console.log("[CALL_ROUTING]", payload);
            ${call_routing}.execute(payload);
        }
    }
};


/***********************
 * 6. UI RENDER
 ***********************/
function renderUI(s, r) {

    ${last_approval_select}.clearItems();

    if (!s.selected) return;

    UI.hide(${Text3});
    UI.show(${layout_RMTL});
    UI.show(${cbx_isrmtl});

    if (r.isHOFlow() && r.isAMHO()) {

        UI.show(${layout_cpd});
        UI.show(${layout_HO_review});

        if (r.hideChiDinhPheDuyet()) {
            UI.hide(${layout_chi_dinh_pheduyet});
        } else {
            UI.show(${layout_chi_dinh_pheduyet});
        }

        if (${radioHoso_pheduyet}.getData() === 'a2') {
            UI.show(${layoutSelectCanbo_pheduyet});
        }

        if (s.selected === 'HO_TTKHCNCC') {
            UI.hide(${layout_chi_dinh});
        }
        
    } else if (r.isRMFlow()) {
     	console.log('r.isRMFlow()', r.isRMFlow());
        UI.show(${layout_cpd});
        UI.show(${layout_RMTL});

        if (r.hideChiDinhPheDuyet()) {
            UI.hide(${layout_chi_dinh_pheduyet});
        } else {
            UI.show(${layout_chi_dinh_pheduyet});
        }

        if (${radioHoso_pheduyet}.getData() === 'a2') {
            UI.show(${layoutSelectCanbo_pheduyet});
        }

        if (s.singleSelect === 'TTKHCN_CC') {
         console.log('Vào đây', r.isRMFlow());
           UI.hide(${layout_RMTL});
        }

        if (!s.isDcTsbd) {
//            UI.show(${layout_chi_dinh});
        ${layout_chi_dinh}.setVisible(true, false);
        }
       
    } else {

        UI.hide(${layout_cpd});
        UI.hide(${layout_HO_review});
        UI.hide(${layout_chi_dinh_pheduyet});

        ${radioHoso_pheduyet}.setData('a1');

        if ((s.selected === 'HO_TTKHCNCC' || s.selected === 'TTKHCN_CC' || s.selected === 'HO' ||  s.selected === "DVKD_TD") && s.isDcTsbd && s.isDelCol) {

            if (s.isDelCol) {
                UI.hide(${layout_chi_dinh});
            } else {
                UI.show(${layout_chi_dinh});
            }
           console.log('--------VAO DAY 2 ---------');
            ${cbx_isrmtl}.setChecked(true);
			//${cbx_isrmtl}.disable(true);
			${cbx_isrmtl}.setEnabled(false);
			UI.show(${layout_RMTL});

        } else if (s.selected === 'HO_TTKHCNCC' || s.selected === 'TTKHCN_CC') {

            UI.hide(${layout_chi_dinh});
            ${cbx_isrmtl}.setChecked(false);
           UI.hide(${layout_RMTL});
        }

        ${last_approval_select}.setSelectedItem("");
        ${alertCa0TheCC}.clear();
        UI.hide(${layout_chidinh_review_appraisal_ca13});
        ${radioHoso1}.setData("a1");
    }

    // special UI
    if (r.isHOFlow() && s.input === "INPUT") {
		console.log("[Show Ks de xuat]", "TRUE");
        UI.show(${layout_kiem_soat_de_xuat_new});
        UI.show(${Line3});
    } else {
		console.log("[Hide Ks de xuat:]", "TRUE");
        UI.hide(${layout_kiem_soat_de_xuat_new});
        UI.hide(${Line3});
    }
}



/***********************
 * 7. MAIN - RUN
 ***********************/
console.log("[START]", State);
renderUI(State, Rule);
Workflow.run(State, Rule);