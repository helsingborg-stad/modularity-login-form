<?php

namespace ModularityLoginForm;

class App
{
    public function __construct()
    {
        if (!is_admin()) {
            return false;
        }

        add_filter('acf/load_field/name=mod_login_form_api_encryption_salt', array($this, 'disabledField'));
        add_filter('acf/load_field/name=mod_login_form_api_encryption_key', array($this, 'disabledField'));
        add_filter('acf/load_field/name=mod_login_form_api_token', array($this, 'disabledField'));
        add_filter('acf/save_post', array($this, 'generateKeys'), 1 );
    }

    /**
     * Disable Fields in Settings
     *
     * @param string $field
     *
     * @return $field (bool) disabled
     */
    public function disabledField($field)
    {
        $field['disabled'] = true;
        return $field;
    }

    /**
     * Generates Encryption keys and Token
     * @return void
     */
    public static function generateKeys()
    {
        if( empty($_POST['acf']) ) {
            return;
        }

        if (!get_option('group_5c3dbbb51fd4d_mod_login_form_api_encryption_key')) {
            $_POST['acf']['field_5c3de0b2b75f2'] = \ModularityLoginForm\App::scrambleEggs();
            $_POST['acf']['field_5c3de127b75f3'] = \ModularityLoginForm\App::scrambleEggs();
            $_POST['acf']['field_5c3de14bb75f4'] = \ModularityLoginForm\App::scrambleEggs();
        }
    }


    /**
     * Encrypt strings
     * @return encryptDecrypt string
     */
    public static function encrypt($module, $string)
    {
        return self::encryptDecrypt($module, 'encrypt', $string);
    }

    /**
     * Decrypt strings
     * @return decrypted string
     */
    public static function decrypt($module, $string)
    {
        return self::encryptDecrypt($module, 'decrypt', $string);
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
     * @param $module
     * @param $meth  string encrypt or decrypt
     * @param $data  mixed data to encrypt or decrypt
     * @return string
     */
    static function encryptDecrypt($module, $meth, $data)
    {
        $encryptMethod = 'AES-256-CBC';
        $encryptSalt = get_field_object('mod_login_form_api_encryption_salt', $module['ID']);
        $encryptKey = get_field_object('mod_login_form_api_encryption_key', $module['ID']);

        if ($encryptSalt['value'] && $encryptKey['value']) {
            switch ($meth) {
                case 'encrypt':
                    return base64_encode(openssl_encrypt(json_encode($data), $encryptMethod,
                        hash('sha256', $encryptKey['value']), 0,
                        substr(hash('sha256', $encryptSalt['value']), 0, 16)));
                    break;
                case 'decrypt':

                    return openssl_decrypt(base64_decode($data), $encryptMethod,
                        hash('sha256', $encryptKey['value']), 0,
                        substr(hash('sha256', $encryptSalt['value']), 0, 16));
                    break;
            }
        } else {
            return false;
        }
    }

}
