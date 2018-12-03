import '../templates/Documentation.scss'
import Helmet from 'react-helmet'
import React from 'react'
import SEO from '../components/SEO'
import SiteHeader from '../components/Layout/Header'
import TableOfContents from '../components/Layout/TableOfContents'
import config from '../../data/SiteConfig'
import styled from 'styled-components'

export default class LessonTemplate extends React.Component {
  render() {
    const [packages, kb] = this.props.data.allData.contents
    const { category } = this.props.pathContext
    return (
      <div>
        <Helmet>
          <title>{`${config.siteTitle}`}</title>
        </Helmet>
        <BodyGrid>
          <HeaderContainer>
            <SiteHeader
              location={this.props.location}
              searchIndex={this.props.data.siteSearchIndex}
            />
          </HeaderContainer>
          <ToCContainer>
            <TableOfContents data={category === 'packages' ? packages : kb} />
          </ToCContainer>
          <BodyContainer>tmp content</BodyContainer>
        </BodyGrid>
      </div>
    )
  }
}

const BodyGrid = styled.div`
  height: 100vh;
  display: grid;
  grid-template-rows: 75px 1fr;
  grid-template-columns: 300px 1fr;

  @media screen and (max-width: 600px) {
    display: flex;
    flex-direction: column;
    height: inherit;
  }
`

const BodyContainer = styled.div`
  grid-column: 2 / 3;
  grid-row: 2 / 3;
  overflow: scroll;
  justify-self: center;
  width: 100%;
  padding: ${props => props.theme.sitePadding};
  @media screen and (max-width: 600px) {
    order: 2;
  }

  & > div {
    max-width: ${props => props.theme.contentWidthLaptop};
    margin: auto;
  }

  & > h1 {
    color: ${props => props.theme.accentDark};
  }
`

const HeaderContainer = styled.div`
  grid-column: 1 / 3;
  grid-row: 1 / 2;
  z-index: 2;
  @media screen and (max-width: 600px) {
    order: 1;
  }
`

const ToCContainer = styled.div`
  grid-column: 1 / 2;
  grid-row: 2 / 3;
  background: ${props => props.theme.lightGrey};
  overflow: scroll;
  @media screen and (max-width: 600px) {
    order: 3;
    overflow: inherit;
  }
`

// /* eslint no-undef: "off" */
export const pageQuery = graphql`
  query SearchQuery {
    siteSearchIndex {
      index
    }
    allData: docsJson {
      contents {
        title
        documents {
          title
          entry {
            id
            childMarkdownRemark {
              fields {
                slug
              }
              frontmatter {
                title
              }
            }
          }
          otherDocs {
            title
            entry {
              id
              childMarkdownRemark {
                fields {
                  slug
                }
                frontmatter {
                  title
                }
              }
            }
          }
        }
      }
    }
  }
`