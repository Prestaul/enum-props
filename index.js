var Enum = require( "enum" );
var RESERVED = [ "has", "is", "toString", "toJSON", "toValue" ];

module.exports = function( def ) {
	var keys, output;

	if ( def instanceof Array ) {
		output = new Enum( def );
	} else if ( typeof def === "object" ) {
		keys = Object.keys( def );
		output = new Enum( keys.reduce( function( map, key ) {
			map[key] = def[key].value === undefined ? def[key] : def[key].value;
			return map;
		}, {} ) );

		// Copy additional properties
		keys.forEach( function( key ) {
			if ( typeof def[key] !== "object" ) {
				return;
			}

			Object.keys( def[key] ).forEach( function( prop ) {
				if ( prop === "value" ) {
					return;
				}

				if ( ~RESERVED.indexOf( prop ) ) {
					throw new Error( "Property '" + prop + "' is a reserved word on enum items." );
				}

				output[key][prop] = def[key][prop];
			} );
		} );
	} else {
		throw new Error( "Enum must be called with an array or an object." );
	}

	return output.freezeEnums();
};
