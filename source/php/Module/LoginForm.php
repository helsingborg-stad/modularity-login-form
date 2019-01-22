<?php

namespace ModularityLoginForm\Module;

/**
 * Class LoginForm
 * @package ModularityLoginForm\Module
 */
class LoginForm extends \Modularity\Module
{
    public $slug = 'LoginForm';
    public $supports = array();
    public $react = false;

    /**
     * Init
     */
    public function init()
    {
        $this->nameSingular = __("Login form", 'modularity-login-form');
        $this->namePlural = __("Login forms", 'modularity-login-form');
        $this->description = __("Front end login", 'modularity-login-form');

        add_action('wp_enqueue_scripts', array($this, 'registerScripts'));
    }

    /**
     * Data array
     *
     * @return array $data
     */
    public function data() : array
    {
        $data = array();
        return $data;
    }

    /**
     * Blade Template
     *
     * @return string
     */
    public function template() : string
    {
        return "modularityLoginForm.blade.php";
    }


    /**
     * Enqueue required scripts
     * @return void
     */
    public function registerScripts()
    {
        wp_register_script('modularity-login-form-js', MODULARITYLOGINFORM_URL . '/dist/' . \ModularityLoginForm\Helper\CacheBust::name('js/modularity-login-form.js'), array('react', 'react-dom'));
    }

    /**
     * Adding javaScript and Localize to make variables available in dom
     *
     * @return string || void
     */
    public function script()
    {
        //Check if modularity is compatible.
        if (!class_exists('\Modularity\Helper\React')) {
            error_log("Modularity Login form cannot run. This plugin requires modularity version 2.11.0 or higher.");
            return;
        }

        (!class_exists('\Modularity\Helper\React')) ? \Modularity\Helper\React::enqueue() : \ModularityLoginForm\Helper\React::enqueue();

        wp_enqueue_script('modularity-login-form-js');
        wp_localize_script('modularity-login-form-js', 'ModularityLoginFormObject', $this->scriptData());
    }


    /**
     * Setting all variables for localize script
     *
     * @return array with data
     */
    public function scriptData()
    {
        $token = get_field_object('mod_login_form_api_token', $this->data['ID']);
        $page = get_field_object('mod_login_to_page', $this->data['ID']);

        $data = array();
        $data['moduleId'] = $this->data['ID'];
        $data['token'] = \ModularityLoginForm\App::encrypt($this->data, $token['value']);
        $data['page'] = \ModularityLoginForm\App::encrypt($this->data, $page['value']);

        //Translation strings
        $data['translation'] = array(
            'title' => __('Modularity Login Form', 'modularity-login-form'),
            'username' => __('Username or E-mail', 'modularity-login-form'),
            'password' => __('Password', 'modularity-login-form'),
            'forgotpasswd' => __('Forgot password?', 'modularity-login-form'),
            'loginbtn' => __('Login', 'modularity-login-form'),
            'logoutbtn' => __('Logout', 'modularity-login-form'),
            'welcome' => __('Welcome', 'modularity-login-form'),
            'prepareLogout' => __(' Please wait, logging out from the system.', 'modularity-login-form'),
            'prepareLogin' => __(' Please wait, while the system redirect you to your account.', 'modularity-login-form'),
        );

        //Send to script
        return $data;
    }

    /**
     * Style - Register & adding css
     *
     * @return void
     */
    public function style()
    {
        wp_register_style('modularity-login-form-css', MODULARITYLOGINFORM_URL . '/dist/' . \ModularityLoginForm\Helper\CacheBust::name('css/modularity-login-form.css'));
        wp_enqueue_style('modularity-login-form-css');
    }

    /**
     * Available "magic" methods for modules:
     * init()            What to do on initialization
     * data()            Use to send data to view (return array)
     * style()           Enqueue style only when module is used on page
     * script            Enqueue script only when module is used on page
     * adminEnqueue()    Enqueue scripts for the module edit/add page in admin
     * template()        Return the view template (blade) the module should use when displayed
     */
}
