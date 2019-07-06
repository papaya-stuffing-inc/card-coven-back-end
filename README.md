--Data Transformation
  -need to filter out non english cards
  -need to filter out unnecessary fields

--Card Query
  -Colors
    -And: Returns only cards that contain x AND y color
      examples: 
        Searching U,G,B returns UG, UB, GB, UGB
    -Or: Returns only cards that are either x OR y color
      examples: 
        Searching U,G,B returns U, G, B
    -And/Or Returns x AND y AND x/y
      examples: 
        Searching U,G,B,R returns U, G, B, R, UG, UB, UR, GB, GR, BR, UGB, GBR, UGBR
    -Exclude Unselected Colors
  -Types
    -queries by sub, standard, and super type via text, case insensitive
  -Text
    -queries by card text, case insensitive
  -Name
    -queries by card name, case insensitive
  -Format
    -queries by which formats the cards are legal in, case insensitive
  -Sets
    -queries for cards that match any of the sets the user specifies ($or)

-Headers:
  -totalCount: Number of cards the query returned
  -pages: number of pages the query returned
  -page: page the query returned
  -hasMore: boolean that reflects if forward paging is possible
  -hasLess: boolean that reflects if back paging is possible

