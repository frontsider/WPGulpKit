<?php
/**
 * The main template file.
 *
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * E.g., it puts together the home page when no home.php file exists.
 *
 * @package wp-gulp-kit
 */

get_header(); ?>

<div class="wrap">
	<main class="content">
		<img src="<?php echo get_bloginfo('template_url'); ?>/assets/img/wp-gulp-kit.png" alt="" />
		<h1>WP Gulp Kit</h1>
		<p>WordPress theme developing</p>
	</main>
</div>

<?php get_footer(); ?>
