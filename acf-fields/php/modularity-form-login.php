<?php 

if (function_exists('acf_add_local_field_group')) {
    acf_add_local_field_group(array(
    'key' => 'group_5c3dbbb51fd4d',
    'title' => __('Modularity Login Form', 'modularity-login-form'),
    'fields' => array(
        0 => array(
            'key' => 'field_5c3dbccb19105',
            'label' => __('Mod Login to page', 'modularity-login-form'),
            'name' => 'mod_login_to_page',
            'type' => 'page_link',
            'instructions' => __('The page the login form transfer user to', 'modularity-login-form'),
            'required' => 1,
            'conditional_logic' => 0,
            'wrapper' => array(
                'width' => '',
                'class' => '',
                'id' => '',
            ),
            'post_type' => array(
            ),
            'taxonomy' => array(
            ),
            'allow_null' => 0,
            'allow_archives' => 1,
            'multiple' => 0,
        ),
        1 => array(
            'key' => 'field_5c826f0013b78',
            'label' => __('Show create account link', 'modularity-login-form'),
            'name' => 'show_create_account_link',
            'type' => 'true_false',
            'instructions' => '',
            'required' => 0,
            'conditional_logic' => 0,
            'wrapper' => array(
                'width' => '',
                'class' => '',
                'id' => '',
            ),
            'message' => '',
            'default_value' => 0,
            'ui' => 0,
            'ui_on_text' => '',
            'ui_off_text' => '',
        ),
        2 => array(
            'key' => 'field_5c826f2513b79',
            'label' => __('Custom create account url', 'modularity-login-form'),
            'name' => 'custom_create_account_url',
            'type' => 'link',
            'instructions' => '',
            'required' => 1,
            'conditional_logic' => array(
                0 => array(
                    0 => array(
                        'field' => 'field_5c826f0013b78',
                        'operator' => '==',
                        'value' => '1',
                    ),
                ),
            ),
            'wrapper' => array(
                'width' => '',
                'class' => '',
                'id' => '',
            ),
            'return_format' => 'array',
        ),
        3 => array(
            'key' => 'field_5c3de0b2b75f2',
            'label' => __('Api encryption salt', 'modularity-login-form'),
            'name' => 'mod_login_form_api_encryption_salt',
            'type' => 'text',
            'instructions' => __('Disabled. Salt is automatically generated when you save this setting.', 'modularity-login-form'),
            'required' => 1,
            'conditional_logic' => 0,
            'wrapper' => array(
                'width' => '',
                'class' => '',
                'id' => '',
            ),
            'default_value' => '',
            'placeholder' => __('Generates automatically', 'modularity-login-form'),
            'prepend' => '',
            'append' => '',
            'maxlength' => '',
            'disabled' => true,
        ),
        4 => array(
            'key' => 'field_5c3de127b75f3',
            'label' => __('Api encryption key', 'modularity-login-form'),
            'name' => 'mod_login_form_api_encryption_key',
            'type' => 'text',
            'instructions' => __('Disabled. Key is automatically generated when you save this setting.', 'modularity-login-form'),
            'required' => 0,
            'conditional_logic' => 0,
            'wrapper' => array(
                'width' => '',
                'class' => '',
                'id' => '',
            ),
            'default_value' => '',
            'placeholder' => __('Generates automaticly', 'modularity-login-form'),
            'prepend' => '',
            'append' => '',
            'maxlength' => '',
            'disabled' => true,
        ),
        5 => array(
            'key' => 'field_5c3de14bb75f4',
            'label' => __('Api token', 'modularity-login-form'),
            'name' => 'mod_login_form_api_token',
            'type' => 'text',
            'instructions' => __('Disabled. Key is automatically generated when you save this setting.', 'modularity-login-form'),
            'required' => 0,
            'conditional_logic' => 0,
            'wrapper' => array(
                'width' => '',
                'class' => '',
                'id' => '',
            ),
            'default_value' => '',
            'placeholder' => __('Generates automaticly', 'modularity-login-form'),
            'prepend' => '',
            'append' => '',
            'maxlength' => '',
            'disabled' => true,
        ),
    ),
    'location' => array(
        0 => array(
            0 => array(
                'param' => 'post_type',
                'operator' => '==',
                'value' => 'mod-loginform',
            ),
        ),
    ),
    'menu_order' => 0,
    'position' => 'normal',
    'style' => 'default',
    'label_placement' => 'top',
    'instruction_placement' => 'label',
    'hide_on_screen' => '',
    'active' => 1,
    'description' => '',
));
}