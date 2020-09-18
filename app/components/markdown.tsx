import React, { PropsWithChildren } from "react"
import markdownit from "markdown-it"
import MarkdownRenderer from "react-native-markdown-renderer"
import { Platform, StyleSheet } from "react-native"

interface MarkdownProps {}

const Markdown = (props: PropsWithChildren<MarkdownProps>) => {
  const mdProps = markdownit({
    typographer: true,
    linkify: true,
  })

  return (
    <MarkdownRenderer markdownit={mdProps} style={Markdownstyles}>
      {props.children}
    </MarkdownRenderer>
  )
}

const Markdownstyles = StyleSheet.create({
  root: {
      color: "white",
  },
  view: {},
  codeBlock: {
    borderWidth: 1,
    borderColor: "#CCCCCC",
    backgroundColor: "#f5f5f5",
    padding: 10,
    borderRadius: 4,
  },
  codeInline: {
    borderWidth: 1,
    borderColor: "#CCCCCC",
    backgroundColor: "#f5f5f5",
    padding: 10,
    borderRadius: 4,
  },
  del: {
    backgroundColor: "#000000",
  },
  em: {
    fontStyle: "italic",
  },
  headingContainer: {
    flexDirection: "row",
  },
  heading: {
    color: "white",
  },
  heading1: {
    fontSize: 32,
  },
  heading2: {
    fontSize: 24,
  },
  heading3: {
    fontSize: 18,
  },
  heading4: {
    fontSize: 16,
  },
  heading5: {
    fontSize: 13,
  },
  heading6: {
    fontSize: 11,
  },
  hr: {
    backgroundColor: "#000000",
    height: 1,
  },
  blockquote: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    margin: 20,
    backgroundColor: "#CCCCCC",
  },
  inlineCode: {
    borderRadius: 3,
    borderWidth: 1,
    fontFamily: "Courier",
    fontWeight: "bold",
  },
  list: {
    color: "white",
  },
  listItem: {
    flex: 1,
    flexWrap: "wrap",
    color: "white",
  },
  listUnordered: {
    color: "white",
  },
  listUnorderedItem: {
    flexDirection: "row",
    justifyContent: "flex-start",
    color: "white",
  },
  listUnorderedItemIcon: {
    color: "white",
    marginLeft: 10,
    marginRight: 10,
    ...Platform.select({
      "ios": {
        lineHeight: 36,
      },
      "android": {
        lineHeight: 30,
      },
    }),
  },
  listUnorderedItemText: {
    color: "white",
    fontSize: 20,
    lineHeight: 20,
  },
  listOrdered: {
    color: "white",
  },
  listOrderedItem: {
    color: "white",
    flexDirection: "row",
  },
  listOrderedItemIcon: {
    color: "white",
    marginLeft: 10,
    marginRight: 10,
    ...Platform.select({
      "ios": {
        lineHeight: 36,
      },
      "android": {
        lineHeight: 30,
      },
    }),
  },
  listOrderedItemText: {
    color: "white",
    fontWeight: "bold",
    lineHeight: 20,
  },
  paragraph: {
    color: "white",
    marginTop: 10,
    marginBottom: 10,
    flexWrap: "wrap",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  hardbreak: {
    width: "100%",
    height: 1,
  },
  strong: {
    color: "white",
    fontWeight: "bold",
  },
  table: {
    color: "white",
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 3,
  },
  tableHeader: {
    color: "white",
  },
  tableHeaderCell: {
    flex: 1,
    color: "white",
    padding: 5,
  },
  tableRow: {
    color: "white",
    borderBottomWidth: 1,
    borderColor: "#000000",
    flexDirection: "row",
  },
  tableRowCell: {
    color: "white",
    flex: 1,
    padding: 5,
  },
  text: {
    color: "white",
  },
  strikethrough: {
    textDecorationLine: "line-through",
  },
  link: {
    textDecorationLine: "underline",
    color: "white",
  },
  blocklink: {
    flex: 1,
    borderColor: "#000000",
    borderBottomWidth: 1,
    color: "white",
  },
  u: {
    borderColor: "#000000",
    borderBottomWidth: 1,
  },
  image: {
    flex: 1,
  },
})

export default Markdown
