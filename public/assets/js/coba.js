
//$(document).ready(function(){
    $(function(){
    // var FormAdd = $('#FormAdd'), FormEdit = $('#FormEdit'), FormGrid = $('#FormGrid');
    $("#jqgrid_data").jqGrid({
        
        url: site_url+'/kliengrid/jqgrid_user',
        mtype: "GET",
        datatype: "json",
        colModel: [
            { label: 'ID', name: 'klien_id', key: true, width: 80, align:'center', hidden:true },
            { label: 'User Name', name: 'nm_klien', align: "center", width: 100 },
            { label: 'Full Name', name: 'alamat', align: "left", width: 200 },
            { label: 'Created Stamp', name: 'no_telp', align: "center", width: 150 },
            { label: 'Last Update Stamp', name: 'no_fax', align: "center", width: 150 },
            { label: 'Role Name', name: 'email', align: "center", width: 100 },
            { label: 'Role Name', name: 'user_login', align: "center", width: 100 }
            
           
            
        ],
        viewrecords: true,
        width: 1098,
        height: 250,
        rowNum: 20,
        rownumbers: true,
        shrinkToFit: false,
        toolbar: [true, "top"],
        sortname: "username",
        sortorder: "asc",
        multiselect: false,
        pager: "#jqgrid_data_pager"
    });
    
   $("#t_jqgrid_data").append('<button class="jqGrid_add" id="btn_add"></button> <button class="jqGrid_edit" id="btn_edit"></button> <button class="jqGrid_delete" id="btn_delete"></button> <button class="jqGrid_export" id="btn_export"></button><button class="jqGrid_print" id="btn_pdf"></button>');
   
   

});
