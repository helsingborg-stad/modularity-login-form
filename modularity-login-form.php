<?php

/**
 * Plugin Name:       Modularity Login Form
 * Plugin URI:        https://github.com/helsingborg-stad/modularity-login-form
 * Description:       Front End login form
 * Version:           1.0.0
 * Author:            Johan Silvergrund && Sebastian Thulin
 * Author URI:        https://helsingborg.se
 * License:           MIT
 * License URI:       https://opensource.org/licenses/MIT
 * Text Domain:       modularity-login-form
 * Domain Path:       /languages
 */

 // Protect agains direct file access
if (! defined('WPINC')) {
    die;
}

define('MODULARITYLOGINFORM_PATH', plugin_dir_path(__FILE__));
define('MODULARITYLOGINFORM_URL', plugins_url('', __FILE__));

load_plugin_textdomain('modularity-login-form', false, plugin_basename(dirname(__FILE__)) . '/languages');

require_once MODULARITYLOGINFORM_PATH . 'source/php/Vendor/Psr4ClassLoader.php';
require_once MODULARITYLOGINFORM_PATH . 'Public.php';

// Instantiate and register the autoloader
$loader = new ModularityLoginForm\Vendor\Psr4ClassLoader();
$loader->addPrefix('ModularityLoginForm', MODULARITYLOGINFORM_PATH);
$loader->addPrefix('ModularityLoginForm', MODULARITYLOGINFORM_PATH . 'source/php/');
$loader->register();

// Start application
new ModularityLoginForm\App();
new ModularityLoginForm\Api\Authentication();

// Acf auto import and export
add_action('plugins_loaded', function () {
    $acfExportManager = new \AcfExportManager\AcfExportManager();
    $acfExportManager->setTextdomain('modularity-login-form');
    $acfExportManager->setExportFolder(MODULARITYLOGINFORM_PATH . 'acf-fields/');
    $acfExportManager->autoExport(array(
        'modularity-form-login' => 'group_5c3dbbb51fd4d',
    ));
    $acfExportManager->import();
});
//Registers the module
add_action('plugins_loaded', function () {
    if (function_exists('modularity_register_module')) {
        modularity_register_module(
            MODULARITYLOGINFORM_PATH . 'source/php/Module/',
            'LoginForm'
        );
    }
});
// Add module template dir
add_filter('Modularity/Module/TemplatePath', function ($paths) {
    $paths[] = MODULARITYLOGINFORM_PATH . 'source/php/Module/views/';
    return $paths;
});

