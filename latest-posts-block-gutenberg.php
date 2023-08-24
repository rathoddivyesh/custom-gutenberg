<?php
/**
 * Plugin Name: Recent Posts Block
 * Description: Custom Gutenberg block to display recent blog posts.
 * Version: 1.0
 * Author: Your Name
 */

// Exit if accessed directly.
if (!defined('ABSPATH')) {
    exit;
}

function recent_posts_block_assets() {
    wp_enqueue_script(
        'recent-posts-block-editor',
        plugins_url('block.js', __FILE__),
        array('wp-blocks', 'wp-element', 'wp-components', 'wp-api', 'wp-block-editor'),
        filemtime(plugin_dir_path(__FILE__) . 'block.js')
    );
}

add_action('enqueue_block_editor_assets', 'recent_posts_block_assets');
