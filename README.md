# modularity-login-form
Login module for modularity

## Getting Started
Get the latest version and follow the installation steps bellow.

### Dependencies
Wordpress, Municipio and Modularity (version 2.11.0 or higher)

### Installing
Get a development enviroment running by doing following:

Activate

```
Activate plugin.
Activate the module in modularity
Add module to page or post
```

Settings

```
Module settings
Set the redirection page
```
## Filters

```
add_filter('modularityLoginForm/AbortLogin', function($message, WP_User $user) {

    //Check that anoter message isen't set before
    if($message === false) {
        if($user->ID = 1) {
            $message = __("You sir may not login.", 'plugin-text-domain');
        }
        if($user->ID = 2) {
            $message = __("Your account has been suspended.", 'plugin-text-domain');
        }
    }

    return $message; 

}, 10, 2); 

```

## Built With

* PHP
* React

## Releases

https://github.com/helsingborg-stad/modularity-login-form/releases

## Authors

* **Johan Silvergrund, Sebastian Thulin**


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details