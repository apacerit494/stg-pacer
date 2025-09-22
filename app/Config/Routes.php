<?php

namespace Config;

// Create a new instance of our RouteCollection class.
$routes = Services::routes();

// Load the system's routing file first, so that the app and ENVIRONMENT
// can override as needed.
if (is_file(SYSTEMPATH . 'Config/Routes.php')) {
    require SYSTEMPATH . 'Config/Routes.php';
}

/*
 * --------------------------------------------------------------------
 * Router Setup
 * --------------------------------------------------------------------
 */
$routes->setDefaultNamespace('App\Controllers');
$routes->setDefaultController('Home');
$routes->setDefaultMethod('index');
$routes->setTranslateURIDashes(false);
$routes->set404Override();
// The Auto Routing (Legacy) is very dangerous. It is easy to create vulnerable apps
// where controller filters or CSRF protection are bypassed.
// If you don't want to define all routes, please use the Auto Routing (Improved).
// Set `$autoRoutesImproved` to true in `app/Config/Feature.php` and set the following to true.
// $routes->setAutoRoute(false);

/*
 * --------------------------------------------------------------------
 * Route Definitions
 * --------------------------------------------------------------------
 */

// We get a performance increase by specifying the default
// route since we don't have to scan directories.
//$routes->setAutoRoute(true);
$routes->get('/', 'Home::index');

/** Login */
// $routes->get('/Login/index', 'Login::index');
$routes->get('/LoginOri/log_out', 'LoginOri::log_out');
// $routes->post('/Login/authentication', 'Login::authentication');
// $routes->post('/Login/Login/authentication', 'Login::authentication');

/** Dashboard */
$routes->get('/Dashboard', 'Dashboard::index', ['filter' => 'role:super_admin,admin,secretariat']);
$routes->get('/Dashboard/index', 'Dashboard::index', ['filter' => 'role:super_admin,admin,secretariat']);
$routes->get('/Dashboard/utama', 'Dashboard::utama');

/** Home */
$routes->get('/Home/index', 'Home::index');
$routes->get('Home/index', 'Home::index');
$routes->get('Home/news/(:any)', 'Home::news/$1');

/** Register */
$routes->get('/Register', 'Register::index', ['filter' => 'role:super_admin,admin,secretariat,committee,committee_certification,certificant']);
$routes->get('/Register/index', 'Register::index', ['filter' => 'role:super_admin,admin,secretariat,committee,committee_certification,certificant']);
$routes->post('/Register/add_user', 'Register::add_user');
$routes->post('/Register/edit_personal', 'Register::edit_personal');
$routes->post('/Register/add_education/(:any)', 'Register::add_education/$1');
$routes->post('/Register/delete_education', 'Register::delete_education');
$routes->post('/Register/add_experience', 'Register::add_experience');
$routes->post('/Register/add_experience/(:any)', 'Register::add_experience/$1');
$routes->post('/Register/delete_experience', 'Register::delete_experience');
$routes->post('/Register/add_audit_experience/(:any)', 'Register::add_audit_experience/$1');
$routes->post('/Register/delete_audit', 'Register::delete_audit');
$routes->post('/Register/add_training/(:any)', 'Register::add_training/$1');
$routes->post('/Register/delete_training', 'Register::delete_training');
$routes->post('/Register/get_data_education_by_id', 'Register::get_data_education_by_id');
$routes->post('/Register/get_data_experience_by_id', 'Register::get_data_experience_by_id');
$routes->post('/Register/get_data_audit_experience_by_id', 'Register::get_data_audit_experience_by_id');
$routes->post('/Register/get_data_training_by_id', 'Register::get_data_training_by_id');


/** Register */
$routes->get('/Certification/pengajuan_sertifikasi', 'Certification::pengajuan_sertifikasi', ['filter' => 'role:super_admin,certificant']);
$routes->get('/Register/index', 'Register::index');
$routes->post('/Register/get_perans', 'Register::get_perans');
$routes->post('/Register/get_scopes', 'Register::get_scopes');
$routes->post('/Certification/check_discount', 'Certification::check_discount');

/** Signup */
$routes->get('/Signup', 'Signup::index');
$routes->get('/Signup/index', 'Signup::index');
$routes->post('/Signup/add_user', 'Signup::add_user');
$routes->post('/Signup/add_signup', 'Signup::add_signup');

/** User */
$routes->get('/Certificant/index', 'Certificant::index', ['filter' => 'role:super_admin,admin,secretariat']);
$routes->get('/Certificant/jqgrid_user', 'Certificant::jqgrid_user');
$routes->post('/Certificant/edit_user', 'Certificant::edit_user');
$routes->post('/Certificant/add_user', 'Certificant::add_user');
$routes->post('/Certificant/delete_user', 'Certificant::delete_user', ['filter' => 'role:super_admin,admin']);
$routes->post('/Certificant/get_data_user_by_id', 'Certificant::get_data_user_by_id');
$routes->post('/Certificant/get_select', 'Certificant::get_select');
$routes->post('/Certificant/get_child', 'Certificant::get_child');
//$routes->get('/Certificant', 'Certificant::index', ['filter' => 'role:super_admin,admin,secretariat']);
//$routes->post('/Certificant/add_user', 'Certificant::add_user');
$routes->post('/Certificant/edit_personal', 'Certificant::edit_personal');
$routes->post('/Certificant/add_education/(:any)', 'Certificant::add_education/$1');
$routes->post('/Certificant/delete_education', 'Certificant::delete_education', ['filter' => 'role:super_admin,admin']);
$routes->post('/Certificant/add_experience', 'Certificant::add_experience');
$routes->post('/Certificant/add_experience/(:any)', 'Certificant::add_experience/$1');
$routes->post('/Certificant/delete_experience', 'Certificant::delete_experience', ['filter' => 'role:super_admin,admin']);
$routes->post('/Certificant/add_audit_experience/(:any)', 'Certificant::add_audit_experience/$1');
$routes->post('/Certificant/delete_audit', 'Certificant::delete_audit');
$routes->post('/Certificant/add_training/(:any)', 'Certificant::add_training/$1');
$routes->post('/Certificant/delete_training', 'Certificant::delete_training', ['filter' => 'role:super_admin,admin']);
$routes->post('/Certificant/get_data_education_by_id', 'Certificant::get_data_education_by_id');
$routes->post('/Certificant/get_data_experience_by_id', 'Certificant::get_data_experience_by_id');
$routes->post('/Certificant/get_data_audit_experience_by_id', 'Certificant::get_data_audit_experience_by_id');
$routes->post('/Certificant/get_data_training_by_id', 'Certificant::get_data_training_by_id');
$routes->post('/Certificant/get_perans', 'Certificant::get_perans');


/** Certification Type */
$routes->get('/CertificationType', 'CertificationType::index', ['filter' => 'role:super_admin,admin,secretariat']);
$routes->get('/CertificationType/index', 'CertificationType::index', ['filter' => 'role:super_admin,admin,secretariat']);
$routes->get('/CertificationType/jqgrid_certification_type', 'CertificationType::jqgrid_certification_type');
$routes->post('/CertificationType/edit_certification_type', 'CertificationType::edit_certification_type');
$routes->post('/CertificationType/add_certification_type', 'CertificationType::add_certification_type');
$routes->post('/CertificationType/delete_certification_type', 'CertificationType::delete_certification_type', ['filter' => 'role:super_admin,admin']);
$routes->post('/CertificationType/get_data_certification_type_by_id', 'CertificationType::get_data_certification_type_by_id');

/** Field Code */
$routes->get('/FieldCode', 'FieldCode::index', ['filter' => 'role:super_admin,admin,secretariat']);
$routes->get('/FieldCode/index', 'FieldCode::index', ['filter' => 'role:super_admin,admin,secretariat']);
$routes->get('/FieldCode/jqgrid_field_code', 'FieldCode::jqgrid_field_code');
$routes->post('/FieldCode/edit_field_code', 'FieldCode::edit_field_code');
$routes->post('/FieldCode/add_field_code', 'FieldCode::add_field_code');
$routes->post('/FieldCode/delete_field_code', 'FieldCode::delete_field_code', ['filter' => 'role:super_admin,admin']);
$routes->post('/FieldCode/get_data_field_code_by_id', 'FieldCode::get_data_field_code_by_id');

/** Scope */
$routes->get('/Scope', 'Scope::index', ['filter' => 'role:super_admin,admin,secretariat']);
$routes->get('/Scope/index', 'Scope::index', ['filter' => 'role:super_admin,admin,secretariat']);
$routes->get('/Scope/jqgrid_scope', 'Scope::jqgrid_scope');
$routes->post('/Scope/edit_scope', 'Scope::edit_scope');
$routes->post('/Scope/add_scope', 'Scope::add_scope');
$routes->post('/Scope/delete_scope', 'Scope::delete_scope', ['filter' => 'role:super_admin,admin']);
$routes->post('/Scope/get_data_scope_by_id', 'Scope::get_data_scope_by_id');

/** Settings */
$routes->get('/Settings/menu_setup', 'Settings::menu_setup', ['filter' => 'role:super_admin,admin']);
$routes->get('/Settings/role_setup', 'Settings::role_setup', ['filter' => 'role:super_admin,admin']);
$routes->get('/settings/jqgrid_data_menu', 'Settings::jqgrid_data_menu');
$routes->post('/settings/get_data_menu_by_id', 'Settings::get_data_menu_by_id');
$routes->post('/settings/get_menu_position', 'Settings::get_menu_position');
$routes->post('/settings/change_position_menu', 'Settings::change_position_menu', ['filter' => 'role:super_admin,admin']);
$routes->post('/settings/add_menu', 'Settings::add_menu');
$routes->post('/settings/delete_menu', 'Settings::delete_menu', ['filter' => 'role:super_admin,admin']);
$routes->post('/settings/edit_menu', 'Settings::edit_menu');
$routes->get('/settings/jqgrid_data_role', 'Settings::jqgrid_data_role');
$routes->post('/settings/get_data_role_by_id', 'Settings::get_data_role_by_id');
$routes->post('/settings/delete_role', 'Settings::delete_role', ['filter' => 'role:super_admin,admin']);
$routes->post('/settings/add_role', 'Settings::add_role');
$routes->post('/settings/edit_role', 'Settings::edit_role');
$routes->post('/settings/get_menu_by_role', 'Settings::get_menu_by_role');
$routes->post('/settings/edit_role_priviledge', 'Settings::edit_role_priviledge');
$routes->get('/settings/user_setup', 'Settings::user_setup', ['filter' => 'role:super_admin,admin,secretariat']);
$routes->get('/settings/setup_company', 'Settings::setup_company', ['filter' => 'role:super_admin,admin,secretariat']);

/** Certification */
$routes->get('/Certification', 'Certification::index', ['filter' => 'role:super_admin,admin,secretariat']);
$routes->get('/Certification/index', 'Certification::index', ['filter' => 'role:super_admin,admin,secretariat']);
$routes->get('/Certification/jqgrid_certification', 'Certification::jqgrid_certification');
$routes->post('/Certification/edit_certification', 'Certification::edit_certification');
$routes->post('/Certification/add_certification', 'Certification::add_certification');
$routes->post('Certification/submit_certification', 'Certification::submit_certification');
$routes->post('/Certification/delete_certification', 'Certification::delete_certification', ['filter' => 'role:super_admin,admin']);
$routes->post('/Certification/get_data_certification_by_id', 'Certification::get_data_certification_by_id');
$routes->post('/Certification/get_cost', 'Certification::get_cost');
$routes->post('/Certification/get_cost_multi', 'Certification::get_cost_multi');
$routes->post('/Certification/getdatatoarray', 'Certification::getdatatoarray');
$routes->post('/Certification/getdatatoarray2', 'Certification::getdatatoarray2');
$routes->post('/Certification/check_doc', 'Certification::check_doc');
$routes->post('/Certification/check_invoice', 'Certification::check_invoice');

/** Pengajuan Sertifikasi */
$routes->post('/Certification/add_pengajuan_sertifikasi/(:any)', 'Certification::add_pengajuan_sertifikasi/$1', ['filter' => 'role:super_admin,certificant']);
$routes->post('Certification/get_data_comment_by_id', 'Certification::get_data_comment_by_id');
$routes->post('Certification/add_comment', 'Certification::add_comment');
$routes->post('Certification/submit_pengajuan_sertifikasi/(:any)', 'Certification::submit_pengajuan_sertifikasi/$1');
$routes->post('Certificant/check_status_certification_by_id', 'Certificant::check_status_certification_by_id');
$routes->post('/Certification/get_field_code', 'Certification::get_field_code');
$routes->post('/Certification/get_scopes_by_certification_id', 'Certification::get_scopes_by_certification_id');
$routes->post('/Certification/get_fieldcode_by_certification_id', 'Certification::get_fieldcode_by_certification_id');
$routes->post('/Certification/get_fieldcodes', 'Certification::get_fieldcodes');
$routes->post('/Certification/get_scopes', 'Certification::get_scopes');
$routes->post('/Certification/get_field_code_select', 'Certification::get_field_code_select');
$routes->post('/Certification/getdatatoarray21', 'Certification::getdatatoarray21');
$routes->post('/Certification/get_certification_types', 'Certification::get_certification_types');
//$route['CronJobController/sendCertificate/(:any)'] = 'CronJobController/sendCertificate/$1';
$routes->get('/CronJobController/sendCertificate/(:any)', 'CronJobController::sendCertificate/$1');

/** Assignment */
$routes->get('/Assignment', 'Assignment::index', ['filter' => 'role:super_admin,secretariat']);
$routes->get('/Assignment/index', 'Assignment::index', ['filter' => 'role:super_admin,secretariat']);
$routes->get('/Assignment/jqgrid_assignment', 'Assignment::jqgrid_assignment');
$routes->post('/Assignment/proses_assignment', 'Assignment::proses_assignment');
$routes->post('/Assignment/delete_assignment', 'Assignment::delete_assignment');
// $routes->post('/Assignment/send_email_purchase_order', 'Assignment::send_email_purchase_order');
// $routes->get('/Assignment/send_email_purchase_order', 'Assignment::send_email_purchase_order');


/** Scoring */
$routes->get('/Scoring', 'Scoring::index', ['filter' => 'role:super_admin,admin,secretariat,committee']);
$routes->get('/Scoring/index', 'Scoring::index', ['filter' => 'role:super_admin,admin,secretariat,committee']);
$routes->get('/Scoring/jqgrid_scoring', 'Scoring::jqgrid_scoring');
$routes->post('/Scoring/edit_scoring', 'Scoring::edit_scoring');
$routes->post('/Scoring/get_data_scoring_by_id', 'Scoring::get_data_scoring_by_id');
$routes->post('/Scoring/verification_score', 'Scoring::verification_score');
$routes->get('/Scoring/verification_score', 'Scoring::verification_score');
$routes->post('/Scoring/get_data_assignmentd_scope', 'Scoring::get_data_assignmentd_scope');
$routes->post('/Scoring/get_data_assignmentd_fieldcode', 'Scoring::get_data_assignmentd_fieldcode');
$routes->post('/Scoring/reject_assignment', 'Scoring::reject_assignment');
$routes->post('/Scoring/re_assignment', 'Scoring::re_assignment');

/** Final Scoring */
$routes->get('/ScoringFinal', 'ScoringFinal::index', ['filter' => 'role:super_admin,admin,secretariat,committee_certification']);
$routes->post('/ScoringFinal/index', 'ScoringFinal::index');
$routes->get('/ScoringFinal/index', 'ScoringFinal::index');
$routes->get('/ScoringFinal/jqgrid_scoring_final', 'ScoringFinal::jqgrid_scoring_final');
$routes->post('/ScoringFinal/edit_scoring_final', 'ScoringFinal::edit_scoring_final');
$routes->post('/ScoringFinal/get_data_scoring_final_by_id', 'ScoringFinal::get_data_scoring_final_by_id');
$routes->post('/ScoringFinal/get_data_scoring_committe_by_id', 'ScoringFinal::get_data_scoring_committe_by_id');
$routes->post('/ScoringFinal/verification_score_final', 'ScoringFinal::verification_score_final');
$routes->get('/ScoringFinal/subgrid_scoring', 'ScoringFinal::subgrid_scoring');
$routes->post('/ScoringFinal/verification_secretariat', 'ScoringFinal::verification_secretariat');
$routes->post('/ScoringFinal/get_data_assignmentd_scope', 'ScoringFinal::get_data_assignmentd_scope');
$routes->post('/ScoringFinal/get_data_assignmentd_fieldcode', 'ScoringFinal::get_data_assignmentd_fieldcode');
$routes->get('/ScoringFinal/surat_penetapan', 'ScoringFinal::surat_penetapan');


/** profile */
$routes->get('/Profile', 'Profile::index', ['filter' => 'role:super_admin,admin,secretariat,committee,committee_certification,certificant']);
$routes->get('/Profile/index', 'Profile::index', ['filter' => 'role:super_admin,admin,secretariat,committee,committee_certification,certificant']);
$routes->get('/Profile/ambil_profil/(:any)', 'Profile::ambil_profil/$1');

/** Upload User */
$routes->get('/Certificant/upload_user', 'Certificant::upload_user', ['filter' => 'role:super_admin,admin,secretariat']);
$routes->get('/Certificant/jqgrid_upload_user', 'Certificant::jqgrid_upload_user');
$routes->post('/Certificant/proses_upload_user', 'Certificant::proses_upload_user');

/** Invoice */
$routes->get('/Invoice', 'Invoice::index', ['filter' => 'role:super_admin,admin']);
$routes->get('/Invoice/index', 'Invoice::index', ['filter' => 'role:super_admin,admin']);
$routes->get('/Invoice/jqgrid_invoice', 'Invoice::jqgrid_invoice');
$routes->post('/Invoice/verification_invoice', 'Invoice::verification_invoice');
$routes->post('/Invoice/add_invoice', 'Invoice::add_invoice', ['filter' => 'role:super_admin,admin']);
$routes->post('/Invoice/edit_invoice', 'Invoice::edit_invoice', ['filter' => 'role:super_admin,admin']);
$routes->post('/Invoice/get_data_invoice_by_id', 'Invoice::get_data_invoice_by_id');
$routes->post('/Invoice/proses_payment', 'Invoice::proses_payment', ['filter' => 'role:super_admin,admin']);
$routes->post('/Invoice/proses_payment_personal_invoice/(:any)', 'Invoice::proses_payment_personal_invoice/$1', ['filter' => 'role:super_admin,admin,certificant']);
$routes->post('/Invoice/get_total_invoice', 'Invoice::get_total_invoice');
$routes->post('/Invoice/get_certification_number', 'Invoice::get_certification_number');

/** Personal Invoice */
$routes->get('/Invoice/personal_invoice', 'Invoice::personal_invoice', ['filter' => 'role:super_admin,certificant']);
$routes->get('/Invoice/cetak_invoice/(:any)', 'Invoice::cetak_invoice/$1');
$routes->get('/Pdf/pdf_invoice', 'Pdf::pdf_invoice');

/** Master Code */
$routes->get('/MasterCode', 'MasterCode::index', ['filter' => 'role:super_admin,admin']);
$routes->get('/MasterCode/index', 'MasterCode::index', ['filter' => 'role:super_admin,admin']);
$routes->get('/MasterCode/jqgrid_master_code', 'MasterCode::jqgrid_master_code');
$routes->post('/MasterCode/edit_master_code', 'MasterCode::edit_master_code');
$routes->post('/MasterCode/add_master_code', 'MasterCode::add_master_code');
$routes->post('/MasterCode/delete_master_code', 'MasterCode::delete_master_code', ['filter' => 'role:super_admin,admin']);
$routes->post('/MasterCode/get_data_master_code_by_id', 'MasterCode::get_data_master_code_by_id');
$routes->post('/MasterCode/get_select_master_code', 'MasterCode::get_select_master_code');

/** my profile */
$routes->get('/Profile/my_profile', 'Profile::my_profile', ['filter' => 'role:super_admin,admin,secretariat,committee,committee_certification,certificant']);

/** Ticket */
$routes->get('/Ticket', 'Ticket::index', ['filter' => 'role:super_admin,admin,secretariat,certificant,committee,committee_certification']);
$routes->get('/Ticket/index', 'Ticket::index', ['filter' => 'role:super_admin,admin,secretariat,certificant,committee,committee_certification']);
$routes->get('/Ticket/jqgrid_ticket', 'Ticket::jqgrid_ticket');
$routes->post('/Ticket/edit_ticket', 'Ticket::edit_ticket');
$routes->post('/Ticket/add_ticket', 'Ticket::add_ticket');
$routes->post('/Ticket/delete_ticket', 'Ticket::delete_ticket', ['filter' => 'role:super_admin,admin']);
$routes->post('/Ticket/get_data_ticket_by_id', 'Ticket::get_data_ticket_by_id');
$routes->post('/Ticket/add_comment', 'Ticket::add_comment');
$routes->post('/Ticket/get_data_comment_by_id', 'Ticket::get_data_comment_by_id');

/** Pengajuan Ticket */
$routes->get('/Ticket/pengajuan_ticket', 'Ticket::pengajuan_ticket', ['filter' => 'role:super_admin,certificant,committee,committee_certification']);
$routes->post('/Ticket/add_pengajuan_ticket', 'Ticket::add_pengajuan_ticket');
$routes->post('/Ticket/get_data_ticket_by_id', 'Ticket::get_data_ticket_by_id');
$routes->post('/Ticket/add_comment', 'Ticket::add_comment');
$routes->post('/Ticket/get_data_comment_by_id', 'Ticket::get_data_comment_by_id');

/** User Setup */
$routes->get('/Settings/user_setup', 'Settings::user_setup', ['filter' => 'role:super_admin,admin']);
$routes->get('/Settings/jqgrid_user_setup', 'Settings::jqgrid_user_setup');
$routes->post('/Settings/get_data_user_setup_by_id', 'Settings::get_data_user_setup_by_id');
$routes->post('/Settings/add_user_setup', 'Settings::add_user_setup');
$routes->post('/Settings/edit_user_setup', 'Settings::edit_user_setup');
$routes->post('/Settings/delete_user_setup', 'Settings::delete_user_setup', ['filter' => 'role:super_admin,admin']);

$routes->post('/Profile/add_profile_picture', 'Profile::add_profile_picture', ['filter' => 'role:super_admin,admin,secretariat,committee,committee_certification,certificant']);

/** Timeline */
$routes->get('/Certification/time_line', 'Certification::time_line', ['filter' => 'role:super_admin,admin,secretariat,committee,committee_certification,certificant']);

/** notification */
$routes->get('/Notification/personal_invoice/(:any)', 'Notification::personal_invoice/$1', ['filter' => 'role:super_admin,certificant']);
$routes->get('/Notification/ticket/(:any)', 'Notification::ticket/$1', ['filter' => 'role:super_admin,admin,certificant,secretariat,committee,committee_certification']);
$routes->get('/Notification/payment_invoice/(:any)', 'Notification::payment_invoice/$1', ['filter' => 'role:super_admin,admin,secretariat']);
$routes->get('/Notification/assignment/(:any)', 'Notification::assignment/$1', ['filter' => 'role:super_admin,committee,committee_certification']);
$routes->get('/Notification/certification/(:any)', 'Notification::certification/$1', ['filter' => 'role:super_admin,secretariat']);
$routes->get('/Notification/asessment/(:any)', 'Notification::asessment/$1', ['filter' => 'role:super_admin,secretariat,committee_certification,committee']);
$routes->get('/Notification/get_notifications', 'Notification::get_notifications');

/** Partner */
$routes->get('/Partner', 'Partner::index', ['filter' => 'role:super_admin,admin']);
$routes->get('/Partner/index', 'Partner::index', ['filter' => 'role:super_admin,admin']);
$routes->get('/Partner/jqgrid_partner', 'Partner::jqgrid_partner');
$routes->post('/Partner/edit_partner', 'Partner::edit_partner');
$routes->post('/Partner/add_partner', 'Partner::add_partner');
$routes->post('/Partner/delete_partner', 'Partner::delete_partner', ['filter' => 'role:super_admin,admin']);
$routes->post('/Partner/get_data_partner_by_id', 'Partner::get_data_partner_by_id');

/** Voucher Discount */
$routes->get('/Voucher', 'Voucher::index', ['filter' => 'role:super_admin,admin,secretariat']);
$routes->get('/Voucher/index', 'Voucher::index', ['filter' => 'role:super_admin,admin,secretariat']);
$routes->get('/Voucher/jqgrid_voucher', 'Voucher::jqgrid_voucher');
$routes->post('/Voucher/edit_voucher', 'Voucher::edit_voucher');
$routes->post('/Voucher/add_voucher', 'Voucher::add_voucher');
$routes->post('/Voucher/delete_voucher', 'Voucher::delete_voucher', ['filter' => 'role:super_admin,admin']);
$routes->post('/Voucher/get_data_voucher_by_id', 'Voucher::get_data_voucher_by_id');

/** Setting | Front End | Slide */
$routes->get('/Settings/slide_front_end', 'Settings::slide_front_end', ['filter' => 'role:super_admin,admin,secretariat']);
$routes->get('/Settings/jqgrid_slide_front_end', 'Settings::jqgrid_slide_front_end');
$routes->post('/Settings/get_data_slide_front_end_by_id', 'Settings::get_data_slide_front_end_by_id');
$routes->post('/Settings/add_slide_front_end', 'Settings::add_slide_front_end');
$routes->post('/Settings/edit_slide_front_end', 'Settings::edit_slide_front_end');
$routes->post('/Settings/delete_slide_front_end', 'Settings::delete_slide_front_end');

/** Setting | Front End | News */
$routes->get('/Settings/news_front_end', 'Settings::news_front_end', ['filter' => 'role:super_admin,admin,secretariat']);
$routes->get('/Settings/jqgrid_news_front_end', 'Settings::jqgrid_news_front_end');
$routes->post('/Settings/get_data_news_front_end_by_id', 'Settings::get_data_news_front_end_by_id');
$routes->post('/Settings/add_news_front_end', 'Settings::add_news_front_end');
$routes->post('/Settings/edit_news_front_end', 'Settings::edit_news_front_end');
$routes->post('/Settings/delete_news_front_end', 'Settings::delete_news_front_end');
$routes->get('/Settings/edit_front_end_news_form/(:any)', 'Settings::edit_front_end_news_form/$1');

/** Download Berkas | Certification Card & Certificate */
$routes->get('/DownloadBerkas/certification_card_certificate', 'DownloadBerkas::certification_card_certificate', ['filter' => 'role:super_admin,admin,secretariat,certificant']);
$routes->get('/DownloadBerkas/jqgrid_certification_card_certificate', 'DownloadBerkas::jqgrid_certification_card_certificate');
$routes->post('/DownloadBerkas/get_data_certification_card_certificate_by_id', 'DownloadBerkas::get_data_certification_card_certificate_by_id');
$routes->post('/DownloadBerkas/upload_certification_card_certification', 'DownloadBerkas::upload_certification_card_certification');

/** Setting | Front End | About */
$routes->get('/Settings/about_front_end', 'Settings::about_front_end', ['filter' => 'role:super_admin,admin,secretariat']);
$routes->post('/Settings/edit_about_front_end', 'Settings::edit_about_front_end');

/** Download Berkas | Skema Sertifikasi */
$routes->get('/DownloadBerkas/skema_sertifikasi', 'DownloadBerkas::skema_sertifikasi', ['filter' => 'role:super_admin,admin,secretariat,certificant,committee,committee_certification']);
$routes->get('/DownloadBerkas/jqgrid_skema_sertifikasi', 'DownloadBerkas::jqgrid_skema_sertifikasi');
$routes->post('/DownloadBerkas/add_skema_sertifikasi', 'DownloadBerkas::add_skema_sertifikasi');
$routes->post('/DownloadBerkas/edit_skema_sertifikasi', 'DownloadBerkas::edit_skema_sertifikasi');
$routes->post('/DownloadBerkas/get_data_skema_sertifikasi_by_id', 'DownloadBerkas::get_data_skema_sertifikasi_by_id');
$routes->post('/DownloadBerkas/delete_skema_sertifikasi', 'DownloadBerkas::delete_skema_sertifikasi', ['filter' => 'role:super_admin,admin']);
$routes->get('/pdf/print_card/(:any)', 'Pdf::print_card/$1');
$routes->get('/pdf/print_certificate/(:any)', 'Pdf::print_certificate/$1');

$routes->get('/Home/directory', 'Home::directory');
$routes->post('/Home/send_message', 'Home::send_message');
$routes->match(['get', 'post'], 'Home/directory', 'Home::directory');

/** Committee Over Due */
$routes->get('/Assignment/committee_over_due', 'Assignment::committee_over_due', ['filter' => 'role:super_admin,admin,secretariat']);
$routes->get('/Assignment/jqgrid_committee_over_due', 'Assignment::jqgrid_committee_over_due');


//cronjob
$routes->get('cron/send-certificate/(:any)', 'CronJobController::sendCertificate/$1');


/*
 * --------------------------------------------------------------------
 * Additional Routing
 * --------------------------------------------------------------------
 *
 * There will often be times that you need additional routing and you
 * need it to be able to override any defaults in this file. Environment
 * based routes is one such time. require() additional route files here
 * to make that happen.
 *
 * You will have access to the $routes object within that file without
 * needing to reload it.
 */
if (is_file(APPPATH . 'Config/' . ENVIRONMENT . '/Routes.php')) {
    require APPPATH . 'Config/' . ENVIRONMENT . '/Routes.php';
}
