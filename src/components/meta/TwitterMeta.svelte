<script lang="ts">
    export let title = "Default Title";
    export let description = "Default Description";
    export let image = "https://example.com/default-image.jpg";
    export let site = "@yourTwitterHandle";
</script>

<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:site" content={site} />
<meta name="twitter:title" content={title} />
<meta name="twitter:description" content={description} />
<meta name="twitter:image" content={image} />
