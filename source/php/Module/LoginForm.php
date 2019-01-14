<?php

namespace ModularityLoginForm\Module;

class LoginForm extends \Modularity\Module
{
    public $slug = 'LoginForm';
    public $supports = array();
    public $react = false;

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
            error_log("Agreements archive cannot run. This plugin requires modularity version 2.11.0 or higher.");
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
        $data = array();
        $data['nonce'] = wp_create_nonce('ModularityLoginForm');
        $data['authToken'] = \ModularityLoginForm\App::encrypt(get_option('group_5be98c9780f80_mod_login_form_api_token'));

        //Translation strings
        $data['translation'] = array(
            'title' => __('Modularity Login Form', 'modularity-login-form'),
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
