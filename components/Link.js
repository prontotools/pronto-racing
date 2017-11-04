import React from 'react'
import NextLink from 'next/link'
import PropTypes from 'prop-types'
import * as R from 'ramda'

import exportPathMap from '../exportPathMap'

const isProd = process.env.NODE_ENV === 'production'
const isDeployingOnGhPages = process.env.GH_PAGES === 'true'

const getExportPathIfPageIsUnique = values =>
  values.length === 1 ? `/pronto-racing${values[0]}` : undefined

const getAsPath = href =>
  R.compose(
    getExportPathIfPageIsUnique,
    R.keys,
    R.filter(map => map.page === href)
  )(exportPathMap)

const Link = ({ children, ...props }) => {
  let asPath
  if (isProd && isDeployingOnGhPages) {
    asPath = getAsPath(props.href)
  }
  return (
    <NextLink {...props} as={asPath}>
      {children}
    </NextLink>
  )
}

Link.propTypes = {
  children: PropTypes.node,
  href: PropTypes.string
}

export default Link
