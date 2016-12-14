<?php
/**
 * Theme functions and definitions
 *
 * @package wp-gulp-kit
 */


if ( ! function_exists( 'wpgk_setup' ) ) :
/**
 * Sets up theme defaults and registers support for various WordPress features.
 *
 * Note that this function is hooked into the after_setup_theme hook, which
 * runs before the init hook. The init hook is too late for some features, such
 * as indicating support for post thumbnails.
 *
 * @since  1.0
 */
function wpgk_setup() {
	/*
	 * Make theme available for translation.
	 * Translations can be filed in the /languages/ directory.
	 */
	//load_theme_textdomain( 'wpgk', get_template_directory() . '/languages' );

	/*
   * Add default posts and comments RSS feed links to head.
   */
	add_theme_support( 'automatic-feed-links' );

	/*
	 * Let WordPress manage the document title.
	 * By adding theme support, we declare that this theme does not use a
	 * hard-coded <title> tag in the document head, and expect WordPress to
	 * provide it for us.
	 */
	add_theme_support( 'title-tag' );

  /*
   * Enable support for Post Formats.
   */
  add_theme_support( 'post-formats', array(
    'aside',
		'image',
		'video',
		'quote',
		'link',
		'gallery',
		'status',
		'audio',
		'chat'
  ) );

	/*
	 * Enable support for Post Thumbnails on posts and pages.
	 */
  add_theme_support( 'post-thumbnails' );

	/*
   * This theme uses wp_nav_menu() in one location.
   */
  // register_nav_menus( array(
  //  'primary' => esc_html__( 'Primary Menu', 'wpgk' ),
  // ) );

	/*
	 * Switch default core markup for search form, comment form,
   * and comments to output valid HTML5.
	 */
  add_theme_support( 'html5', array(
  	'search-form',
		'comment-form',
		'comment-list',
		'gallery',
		'caption',
  ) );

}
endif; // wpgk_setup
add_action( 'after_setup_theme', 'wpgk_setup' );


/**
 * Set the content width in pixels, based on the theme's design and stylesheet.
 *
 * Priority 0 to make it available to lower priority callbacks.
 *
 * @global int $content_width
 */
function wpgk_content_width() {
	$GLOBALS['content_width'] = apply_filters( 'wpgk_content_width', 640 );
}
add_action( 'after_setup_theme', 'wpgk_content_width', 0 );


/**
 * Register widget area.
 *
 * @link https://developer.wordpress.org/themes/functionality/sidebars/#registering-a-sidebar
 */
// function wpgk_widgets_init() {
// 	register_sidebar( array(
// 		'name'          => esc_html__( 'Sidebar', 'wpgk' ),
// 		'id'            => 'sidebar-1',
// 		'description'   => esc_html__( 'Add widgets here.', 'wpgk' ),
// 		'before_widget' => '<section id="%1$s" class="widget %2$s">',
// 		'after_widget'  => '</section>',
// 		'before_title'  => '<h2 class="widget-title">',
// 		'after_title'   => '</h2>',
// 	) );
// }
// add_action( 'widgets_init', 'wpgk_widgets_init' );


/**
 *
 * Scripts: Frontend with no conditions, Add Custom Scripts to wp_head
 *
 * @since  1.0.0
 *
 */
add_action( 'wp_enqueue_scripts', 'wpgk_scripts' );
function wpgk_scripts()
{
  if ( $GLOBALS['pagenow'] != 'wp-login.php' && !is_admin() ) {

		// jQuery
  	wp_enqueue_script('jquery');
    //wp_deregister_script('jquery'); // Deregister WordPress jQuery
    //wp_register_script('jquery', 'http://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js', array(), '1.11.2');

    // Vendors scripts
    wp_register_script('wpgk_vendorsJs', get_template_directory_uri() . '/assets/js/vendors.min.js');
    wp_enqueue_script('wpgk_vendorsJs');

    // Customs scripts
    wp_register_script('wpgk_customJs', get_template_directory_uri() . '/assets/js/custom.min.js');
    wp_enqueue_script('wpgk_customJs');

  }
}


/**
 *
 * Styles: Frontend with no conditions, Add Custom styles to wp_head
 *
 * @since  1.0
 *
 */
add_action( 'wp_enqueue_scripts', 'wpgk_styles' ); // Add Theme Stylesheet
function wpgk_styles()
{
  /**
   *
   * Minified and Concatenated styles.
   *
   */
  wp_register_style('wpgk_style', get_template_directory_uri() . '/style.css', array(), '1.0', 'all');
  // wp_register_style('wpgk_style', get_template_directory_uri() . '/style.min.css', array(), '1.0', 'all');
  wp_enqueue_style('wpgk_style');

}


/**
 *
 * Comment Reply js to load only when thread_comments is active
 *
 * @since  1.0.0
 *
 */
add_action( 'wp_enqueue_scripts', 'wpgk_enqueue_comments_reply' );
function wpgk_enqueue_comments_reply() {
  if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
    wp_enqueue_script( 'comment-reply' );
  }
}
