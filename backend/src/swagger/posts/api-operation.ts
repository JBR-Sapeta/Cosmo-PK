export const OPERATION = {
  getPosts: { description: 'Get preview list of published posts. With cache' },
  getPublishedPosts: { description: 'Get preview list of published posts.' },
  getPostsDrafts: { description: 'Get preview list of posts drafts.' },
  getDeletedPosts: { description: 'Get preview list of deleted posts.' },
  getPost: { description: 'Get posts by slug.' },
  getPostById: { description: 'Get post by id.' },
  getPostByTag: { description: 'Get posts by tag.' },
  createPost: { description: 'Create new post.' },
  updatePost: { description: 'Update post with given id.' },
  uploadPostImage: { description: 'Upload imageg for post with given id.' },
  deletePost: { description: 'Mark post as deleted.' },
  removePost: { description: 'Remove post from database.' },
};
