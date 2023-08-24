(function (blocks, element, components, api, editor) {
    var __ = wp.i18n.__; // The __() function for internationalization.
    var apiFetch = wp.apiFetch;
    var RichText = wp.blockEditor.RichText;
    var el = wp.element.createElement; // Import the el function
    var useEffect = wp.element.useEffect;

    blocks.registerBlockType('my-plugin/recent-posts', {
        title: __('Recent Blog Posts', 'my-plugin'),
        icon: 'megaphone',
        category: 'common',
        attributes: {
            posts: {
                type: 'array',
                default: [],
            },
        },
        edit: function (props) {
            
            var attributes = props.attributes;

            function fetchRecentPosts() {
                var recentPostsQuery = {
                    per_page: 5, // Number of recent posts to display
                    order: 'desc', // Display posts in descending order (newest first)
                    orderby: 'date', // Order posts by date
                };

                var restApiUrl = '/wp/v2/posts?' + new URLSearchParams(recentPostsQuery);

                // Fetch recent posts using wp_remote_get
                wp.apiFetch({ path: restApiUrl })
                .then(function (posts) {
                    props.setAttributes({ posts: posts });
                })
                .catch(function (error) {
                    console.error('Error fetching recent posts:', error);
                    props.setAttributes({ posts: [] }); // Set posts to an empty array to handle the error gracefully.
                });
            }

            //console.log('test');

            if (attributes.posts.length === 0) {
                fetchRecentPosts();

            }

            var postList = attributes.posts.map(function (post) {
                return wp.element.createElement(
                    RichText.Content,
                    {
                        tagName: 'p',
                        key: post.id,
                        value: post.title.rendered,
                    }
                );
            });

            return wp.element.createElement(
                'article',
                null,
                postList
            );
        },
        save: function (props) {
            return null;

        },
    });
})(
    window.wp.blocks,
    window.wp.element,
    window.wp.components,
    window.wp.apiFetch,
    window.wp.blockEditor
);
