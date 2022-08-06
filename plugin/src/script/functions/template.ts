var CARD_DETAILS = {
  image: `<div class="__linkPreview_div0"><img src="<::image::>" alt="thumbnail" /></div>`,
  main: `<div class="__linkPreview_div1"><p><::title::></p><div class="__linkPreview_icon"><img src="<::icon::>" alt="icon" /></div></div><div class="__linkPreview_div2"><p><::description::></p></div>`,
  extra: `<div class="__linkPreview_div3"><span><::type::></span><span><::language::></span></div>`,
};

export default function getHTMLDetails(
  data: {
    title: string;
    description: string;
    icon: string;
    image?: string;
  },
  show: { image: boolean; extra: boolean }
) {
  var html = "";
  if (show.image) {
    html += CARD_DETAILS.image;
  }
  html += CARD_DETAILS.main;
  if (show.extra) {
    html += CARD_DETAILS.extra;
  }
  Object.keys(data).forEach((key: string) => {
    html = html.replace(new RegExp(`<::${key}::>`, "g"), data[key]);
  });

  return html;
}
