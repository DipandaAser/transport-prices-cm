<script lang="ts">
    export let title = "Default Title";
    export let description = "Default Description";
    export let image = "https://example.com/default-image.jpg";
    export let url = "https://transport.cm";
    export let type = "article";
    export let siteName = "Transport CM";
</script>

<meta property="og:title" content={title} />
<meta property="og:description" content={description} />
<meta property="og:url" content={url} />
<meta property="og:type" content={type} />
<meta property="og:image" content={image} />
<meta property="og:site_name" content={siteName} />
