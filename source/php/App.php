<?php

namespace ModularityLoginForm;

class App
{
    public function __construct()
    {
        add_action('admin_enqueue_scripts', array($this, 'enqueueStyles'));
        add_action('admin_enqueue_scripts', array($this, 'enqueueScripts'));
    }

    /**
     * Enqueue required style
     * @return void
     */
    public function enqueueStyles()
    {
        wp_register_style('modularity-login-form-css', MODULARITYLOGINFORM_URL . '/dist/' . \ModularityLoginForm\Helper\CacheBust::name('css/modularity-login-form.css'));
    }

    /**
     * Enqueue required scripts
     * @return void
     */
    public function enqueueScripts()
    {
        wp_register_script('modularity-login-form-js', MODULARITYLOGINFORM_URL . '/dist/' . \ModularityLoginForm\Helper\CacheBust::name('js/modularity-login-form.js'));
    }

    /**
     * Encrypt strings
     * @return encryptDecrypt string
     */
    public static function encrypt($string)
    {
        return self::encryptDecrypt('encrypt', $string);
    }

    /**
     * Decrypt strings
     * @return decrypted string
     */
    public static function decrypt($string)
    {
        return self::encryptDecrypt('decrypt', $string);
    }

    /**
     * Generates Keys
     * @return string
     */
    public static function scrambleEggs(){
        return substr(str_shuffle("0123456789&abcdefghijklm!nopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!?"), 0, 20);
    }

    /**
     * Encrypt & decrypt data
     * @param $meth  string encrypt or decrypt
     * @param $data  mixed data to encrypt or decrypt
     * @return string
     */
    static function encryptDecrypt($meth, $data)
    {
        $encryptMethod = 'AES-256-CBC';
        $encryptSalt = get_option('group_5be98c9780f80_mod_login_form_api_encryption_salt');
        $encryptKey = get_option('group_5be98c9780f80_mod_login_form_api_encryption_key');

        if ($encryptSalt && $encryptKey) {
            switch ($meth) {
                case 'encrypt':
                    return base64_encode(openssl_encrypt(json_encode($data), $encryptMethod,
                        hash('sha256', $encryptKey), 0,
                        substr(hash('sha256', $encryptSalt), 0, 16)));
                    break;
                case 'decrypt':

                    return openssl_decrypt(base64_decode($data), $encryptMethod,
                        hash('sha256', $encryptKey), 0,
                        substr(hash('sha256', $encryptSalt), 0, 16));
                    break;
            }
        } else {
            return false;
        }
    }

}
