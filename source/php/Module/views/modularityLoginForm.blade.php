<div class="grid">
    <div class="grid-md-12" id="login-box">
        <div class="box box-panel box-panel-secondary">
            @if (!$hideTitle && !empty($post_title))<h4 class="box-title">{!! apply_filters('the_title', $post_title) !!}</h4>@endif
            <div class="box-content">
                <div id="modularity-login-form" class="modularity-login-form-react"></div>
            </div>
        </div>
    </div>
</div>


