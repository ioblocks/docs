const { createFilePath } = require('gatsby-source-filesystem')
const path = require('path')
const webpackLodashPlugin = require('lodash-webpack-plugin')

exports.onCreateNode = ({ node, boundActionCreators, getNode }) => {
  const { createNodeField } = boundActionCreators
  if (node.internal.type === 'MarkdownRemark') {
    const slug = createFilePath({
      node,
      getNode,
      basePath: 'docs',
      trailingSlash: false
    })
    console.log('SLUG', slug)
    createNodeField({ node, name: 'slug', value: slug })
  }
}

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators

  return new Promise((resolve, reject) => {
    const documentPage = path.resolve('src/templates/Document.jsx')
    resolve(
      graphql(
        `
          {
            allMarkdownRemark {
              edges {
                node {
                  frontmatter {
                    title
                    category
                  }
                  fields {
                    slug
                  }
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          reject(result.errors)
        }

        result.data.allMarkdownRemark.edges.forEach(edge => {
          const { slug } = edge.node.fields
          const { category } = edge.node.frontmatter
          createPage({
            path: slug,
            component: documentPage,
            context: {
              slug: slug,
              category
            }
          })
        })
      })
    )
  })
}

exports.modifyWebpackConfig = ({ config, stage }) => {
  if (stage === 'build-javascript') {
    config.plugin('Lodash', webpackLodashPlugin, null)
  }
}
