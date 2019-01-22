<?php

namespace ModularityLoginForm\Api;

/**
 * Class Authentication
 * @package ModularityLoginForm\Api
 */
class Authentication
{
    /**
     * @var
     */
    public static $userId;

    /**
     * Authentication constructor.
     */
    public function __construct()
    {
        //Run register rest routes
        add_action('rest_api_init', array($this, 'registerRestRoutes'));
    }

    /**
     * Registers all rest routes for login / logout
     *
     * @return void
     */
    public function registerRestRoutes()
    {

        //Login rest route
        register_rest_route(
            "ModularityLoginForm/v1",
            "Authentication/Login",
            array(
                'methods' => \WP_REST_Server::ALLMETHODS,
                'callback' => array($this, 'login')
            )
        );

        //Login rest route
        register_rest_route(
            "ModularityLoginForm/v1",
            "Authentication/Logout",
            array(
                'methods' => \WP_REST_Server::ALLMETHODS,
                'callback' => array($this, 'logout')
            )
        );
    }

    /**
     * Login a user
     *
     * @param object $request Object containing request details
     *
     * @return WP_REST_Response
     */
    public function login($request)
    {

        $moduleId = (int)$request->get_param('moduleId');
        $authToken = str_replace('"', '', \ModularityLoginForm\App::decrypt($moduleId, $request->get_param('token')));
        $moduleToken = get_field_object('mod_login_form_api_token', $moduleId);

        //No valid auth token
        if ($authToken != $moduleToken['value']) {
            return wp_send_json(
                array(
                    'state' => 'error',
                    'message' => __("Token error!!!! Please provide one in the modularity login form settings.",
                        'modularity-login-form')
                )
            );
        }

        //Verify provided data
        if ($request->get_param('username') && $request->get_param('password')) {

            //Try to signon
            $result = wp_signon(
                array(
                    'user_login' => $request->get_param('username'),
                    'user_password' => $request->get_param('password'),
                    'rememberme' => 1
                )
            );

            //Custom validation on login
            if($message = apply_filters('modularityLoginForm/AbortLogin', false, $result)){
                
                //Do logout
                wp_logout();

                //Return custom error message 
                return array(
                    'message' => $message,
                    'state' => 'error'
                );
            }

            //Login successful
            if (!is_wp_error($result)) {
                $page = str_replace('"', '', \ModularityLoginForm\App::decrypt($moduleId, $request->get_param('page')));

                return array(
                    'message' => __('Login successful.', 'modularity-login-form'),
                    'url' => $page,
                    'state' => 'success',
                    'user' => array_filter(
                        (array)$result->data,
                        function ($itemKey) {
                            return in_array($itemKey, array('ID', 'user_login', 'display_name'));
                        },
                        ARRAY_FILTER_USE_KEY
                    )
                );
            }

            //Incorrect password
            if (is_wp_error($result) && $result->get_error_code() == "incorrect_password") {
                return array(
                    'message' => __('The username and password you provided did not match.', 'modularity-login-form'),
                    'state' => 'error'
                );
            }

            //User not exists
            if (is_wp_error($result) && $result->get_error_code() == "invalid_username") {
                return array(
                    'message' => __('The username or email that you provided does not exists.',
                        'modularity-login-form'),
                    'state' => 'error'
                );
            }
        }

        return array(
            'message' => __('You have to provide both email and password.', 'modularity-login-form'),
            'state' => 'error'
        );
    }

    /**
     * Logout the user
     *
     * @param object $request Object containing request details
     *
     * @return WP_REST_Response
     */
    public function logout($request)
    {
        $moduleId = (int)$request->get_param('moduleId');
        $authToken = str_replace('"', '', \ModularityLoginForm\App::decrypt($moduleId, $request->get_param('token')));
        $moduleToken = get_field_object('mod_login_form_api_token', $moduleId);

        //No valid auth token
        if ($authToken != $moduleToken['value']) {
            return wp_send_json(
                array(
                    'state' => 'error',
                    'message' => __("Token error!!!! Please provide one in the modularity login form settings.",
                        'modularity-login-form')
                )
            );
        }

        wp_logout();
        return array(
            'message' => __('You have now logged out.', 'modularity-login-form'),
            'url' => str_replace('"', '',
                \ModularityLoginForm\App::decrypt($moduleId, $request->get_param('page'))),
            'state' => 'success'
        );
    }


}