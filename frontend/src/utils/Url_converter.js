function urlConverter(slug) {
    let url = slug.replace(/[^\w\s]/gi, "-");
    url = url.toLowerCase();
    url = url.replace(/\s+/g, "-");
    url = url.replace(/-+/g, "-");
    url = url.replace(/^-+|-+$/g, "");
  
    return url;
  }

  export default urlConverter;