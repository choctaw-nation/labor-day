<?php
/**
 * Page: Festival Information
 */

$content = new Content_Sections();
?>
<section id="faqs">
	<div class="container gx-5">
		<?php extract( get_field( 'faqs' ) ); ?>
		<header class="section-header">
			<figure class="section-header__banner-image">
				<img src="<?php echo $banner; ?>" alt="">
			</figure>
			<h2 class="section-header__headline headline">
				<?php echo $headline; ?>
			</h2>
			<span class="section-header__subheadline subheadline">
				<?php echo $subheadline; ?>
			</span>
		</header>
		<?php
		foreach ( $faq as $field ) {
			echo "<div class='faq'>";
			echo "<span class='faq__question headline'>{$field['question']}</span>";
			echo "<span class='faq__answer subheadline'>{$field['answer']}</span>";
			echo '</div>';
		}
		?>
	</div>
</section>

<section id="general-rules">
	<div class="container">
		<?php extract( get_field( 'general_rules' ) ); ?>
		<header class="section-header">
			<figure class="section-header__banner-image">
				<img src="<?php echo $banner; ?>" alt="">
			</figure>
			<h2 class="section-header__headline headline">
				<?php echo $headline; ?>
			</h2>
		</header>
		<ol>
			<?php
			foreach ( $rules as $rule ) {
				echo "<li>{$rule['rule']}</li>";
			}
			?>
		</ol>
	</div>
</section>