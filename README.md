# Unfold to the Max

Introducing *jQuery Unfold*. Now you can do fancy Mail app style unfold effects in your browser. It looks great in Webkit and ok in Firefox (as usual).

[Experience the live demo now!](http://mikejholly.github.com/jquery-unfold/)

## Unfold Some Content

```
$(window).load(function() {
  $('article').unfold();
});
```

*Note the use of ```$(window).load```. The content needs to be loaded before calculating heights.*

## Collapse it

```
$('article').fold();
```

## Some Options

Pass in a custom easing function to impress the girls:

```
$('article').unfold({
  easing: 'easingFunction',
  duration: 1000,
  slices: 10 
});
```

### Tumblr "Plug-in"

```
<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.js"></script>
<script type="text/javascript" src="https://raw.github.com/danro/jquery-easing/master/jquery.easing.js"></script>
<script type="text/javascript" src="https://raw.github.com/mikejholly/jquery-unfold/master/jquery.unfold.js"></script>
<script type="text/javascript">
$(function() {
  $('.post h2').click(function(){
    $(this).parent().find('.regular_body').unfold();
  });
});
</script>
<style>
.post .regular_body { display: none; }
</style>
```

### Notes
* Make sure all content is loaded *before* invoking otherwise measurements will be off!
* Inspired by the Mail app expando transition in
* Works in FF10+ and Webkit.