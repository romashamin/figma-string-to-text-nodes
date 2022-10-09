/*
 *  1. Copy-paste this sript to the Scripter Figma plugin by Rasmus
 *  https://www.figma.com/community/plugin/757836922707087381
 *
 *  2. Select any text node as an example of text style and hit Run
 *
 */

// Data source
const elementsInGroup = 26
const uppercase = 'AÁĂǍÂÄÀĀĄÅǺÃÆǼBCĆČÇĊDÐĎĐḌEÉĚÊËĖÈĒĘẼƏFGĞǦĢĠHĦḤIĲÍÎÏİỊÌĪĮĨJKĶLĹĽĻĿŁMNŃŇŅƝÑŊOÓÔÖỌÒŐŌØǾÕŒPÞQRŔŘŖSŚŠŞȘṢẞTŦŤŢȚṬUÚŬÛÜỤÙŰŪŲŮŨVWẂŴẄẀXYÝŶŸỲȲỸZŹŽŻẒ'
const lowercase = 'aáăǎâäàāąåǻãæǽbcćčçċdðďđḍeéěêëėèēęẽəfgğǧģġhħḥiıíîïịìĳīįĩjȷkķĸlĺľļŀłmnńňņɲñŋoóôöọòőōøǿõœpþqrŕřŗsśšşșṣßtŧťţțṭuúŭûüụùűūųůũvwẃŵẅẁxyýŷÿỳȳỹzźžżẓ'

const uppercaseExtLatin = uppercase.replace(/[A-Z]/g, '')
const lowercaseExtLatin = lowercase.replace(/[a-z]/g, '')

const textSample = figma.currentPage.selection[0]
const artboard = textSample.parent

function splitStringIntoTextNodes(str) {
	const textNodes = []
	for (let char of str) {
		const newTextSample = textSample.clone()
		const length = textSample.characters.length
		artboard.appendChild(newTextSample)
		newTextSample.deleteCharacters(0, length)
		newTextSample.insertCharacters(0, char)
		newTextSample.textAutoResize = 'WIDTH_AND_HEIGHT'
		textNodes.push(newTextSample)
	}
	return textNodes
}

function organizeTextNodes(textNodes, elementsInGroup = 26) {
	const groups = []
	let i = 0
	let iterations = textNodes.length
	let currentGroup = []
	for (let node of textNodes) {
		currentGroup.push(node)
		i++
		iterations--
		// if the limit of the elements in the group is reached
		if (i === elementsInGroup || iterations === 0) {
			const groupNode = figma.group(currentGroup, artboard)
			// Convert to FrameNode
			groups.push(groupNode)
			currentGroup = []
			i = 0
		}
	}
	figma.group(groups, artboard)
}

if (isText(textSample)) {
	organizeTextNodes(splitStringIntoTextNodes(uppercaseExtLatin))
	organizeTextNodes(splitStringIntoTextNodes(lowercaseExtLatin))
}
