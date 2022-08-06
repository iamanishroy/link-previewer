# Link Previewer

An opensource project/website that allows you to **preview** the title, thumbnail image, and description of any public link, as well as **embed** the preview card into your website with just two lines of code.

![Logo](https://link-previewer.anishroy.me/tn.png)

## Features

- Simple to use plugin
- User-friendly interface
- Responsive design

## Highlights:

- For a faster initial load time, **dynamic imports** were used.
- **Gulp** was used to automatically compile and build the modules for a more efficient development approach.
- I used **Autoprefixer** to generate CSS that will work with a variety of browsers.

## Plugin Reference

Simply include the JavaScript **`<script>`** tag to seamlessly integrate this into your website.

### Script Tag

```html
<script
  src="https://cdn.jsdelivr.net/npm/link-preview-card@1.0.1/dist/script/index.js"
  defer
></script>
```

### anchor Tag

add this where you want to embed preview link card

```html
<a
  href="put-your-link-here"
  link-preview-card
  custom-border="1px solid black"
  custom-box-shadow="0px 0px 8px 0px orange"
></a>
```

#### Custom Attributes

| Attribute           | Description                       |
| :------------------ | :-------------------------------- |
| `custom-border`     | enables using custom border style |
| `custom-box-shadow` | enables using custom box-shadow   |

## License

[MIT](https://choosealicense.com/licenses/mit/)

## Contributor

- [@iamanishroy](https://github.com/iamanishroy/)
