
'use strict';

import { StyleSheet } from "react-native";
//{global.world_type === 1 ? '#228B22' : '#4169E1'}
module.exports = StyleSheet.create({
	sidebar: {
 		flex: 1,
        padding: 10,
        paddingRight: 0,
        paddingTop: 30,
 				backgroundColor: global.world_type === 1 ? '#228B22' : '#4169E1'
    },
});
