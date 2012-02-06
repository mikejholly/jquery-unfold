# Unfold to the Max

Introducing *jQuery Unfold*. Now you can do fancy Mail app style unfold effects in your browser. It looks great in Webkit and pretty good in Firefox (seems to be the new status quo).

* [Check out the demo.](http://mikejholly.github.com/jquery-unfold/)
* [Read more about how it works.](http://mikejholly.com)

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

### Notes
* Make sure all content is loaded *before* invoking otherwise measurements will be off!
* Inspired by the Mail app expando transition in
* Works in FF10+ and Webkit.