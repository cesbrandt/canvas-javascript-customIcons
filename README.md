# canvas-javascript-customIcons
"Simple" JavaScript to allow for the replacement of Instructure icons with other Instructure icons. Don't like that rocket ship icon for quizzes? Make it the rubric! Confused by external links and external tools having the same icon? Change one!

Wait, can't this be done with basic CSS? Why overkill it with JavaScript? That's easy, Instructure updates the codepoints any time they add/remove/change a glyph, breaking prewritten CSS, which uses those codepoints to identify the glyph to render. This isn't a problem for Instructure, since their CSS gets updated when they compile a new release. However, that doesn't carry over to institution-level custom CSS.

This JavaScript will parse all stylesheets loaded to the DOM to identify all style rules matching `icon-*:before` selectors. It uses the the character assigned to `content` as the character corresponding to the icon name. Finally, it generates a new `style` element and inserts new rules using the CSS selectors provided, the `content` corresponding to the selector whose name corresponds to the name provided, and any comment you feel is appropriate for snooping eyes.

#### Table of Contents
- [Changelog](#changelog)
- [How-To Use](#how-to-use)
- [Adjustable Configuration](#adjustable-configuration)

#### Changelog
04/28/2023
- Initial Load

[Back to Top](#canvas-javascript-customicons)

#### How-To Use
1. Add the "Do Not Touch" functions to your global JavaScript's "Do Not Touch" section (assuming you have one)
2. Add the "Config" variable to your global JavaScript's "Config" section
3. Build out your custom icons list.

The initial script comes with 2 icons precustomized:
- Quizzes: Replaces the `quiz` icon with the `rubricdark` icon
- External Tools: Replaces the `link` icon with the `externallink` icon

[Back to Top](#canvas-javascript-customicons)

#### Adjustable Configuration
The configuration is pretty simple:
1. CSS selector to apply the icon to
2. Icon name as it appears in the Instructure CSS
3. (Optional) Comment

Layout
```js
[1, 2, 3]
```

Example
```js
['.context_module_item.context_external_tool .icon-link::before', 'external-link', 'Window w/ Arrow Out (externallink)'],
['.icon-quiz:before, .icon-quiz.icon-Solid:before', 'rubric-dark']
```

Rendered CSS
```css
.context_module_item.context_external_tool .icon-link::before { content: "\EA77";  /* Window w/ Arrow Out (externallink) */ }
.icon-quiz:before, .icon-quiz.icon-Solid:before { content: "\EB0F"; }
```

[Back to Top](#canvas-javascript-customicons)
