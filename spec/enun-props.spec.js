var Enum = require( "../" );
var assert = require( "chai" ).assert;

function baseTests( colors ) {
	it( "enum should be frozen", function() {
		assert.isTrue( Object.isFrozen( colors ) );
	} );

	it( "enum items should be frozen", function() {
		assert.isTrue( Object.isFrozen( colors.yellow ) );
	} );

	it( "has value prop", function() {
		assert.property( colors, "yellow" );
		assert.strictEqual( colors.yellow.value, 2 );
	} );

	it( "can retrieve by value", function() {
		assert.strictEqual( colors.get( 2 ), colors.yellow );
	} );

	it( "`is` value", function() {
		assert.isTrue( colors.yellow.is( 2 ) );
	} );

	it( "`is`n't another value", function() {
		assert.isFalse( colors.yellow.is( 1 ) );
	} );

	it( "`has` value", function() {
		assert.isTrue( colors.yellow.has( 2 ) );
	} );

	it( "`has`n't another value", function() {
		assert.isFalse( colors.yellow.has( 1 ) );
	} );

	it( "== value", function() {
		assert.equal( colors.yellow, 2 );
	} );

	it( "!== value", function() {
		assert.notStrictEqual( colors.yellow, 2 );
	} );
}

describe( "enum-props", function() {
	describe( "from an array", function() {
		var colors = Enum( [ "red", "yellow", "green" ] );

		baseTests( colors );
	} );

	describe( "from an object", function() {
		var colors = Enum( {
			red: 1,
			yellow: 2,
			green: 4
		} );

		baseTests( colors );
	} );

	describe( "from an object with props", function() {
		var colors = Enum( {
			red: {
				value: 1,
				description: "stop",
				isRed: true,
				order: 2
			},
			yellow: {
				value: 2,
				description: "caution",
				isRed: false,
				order: 1
			},
			green: {
				value: 4,
				description: "go",
				isRed: false,
				order: 0
			}
		} );

		baseTests( colors );

		it( "should allow string props", function() {
			assert.property( colors.red, "description" );
			assert.strictEqual( colors.red.description, "stop" );

			assert.property( colors.yellow, "description" );
			assert.strictEqual( colors.yellow.description, "caution" );

			assert.property( colors.green, "description" );
			assert.strictEqual( colors.green.description, "go" );
		} );

		it( "should allow boolean props", function() {
			assert.property( colors.red, "isRed" );
			assert.isTrue( colors.red.isRed );

			assert.property( colors.yellow, "isRed" );
			assert.isFalse( colors.yellow.isRed );

			assert.property( colors.green, "isRed" );
			assert.isFalse( colors.green.isRed );
		} );

		it( "should allow numeric props", function() {
			assert.property( colors.red, "order" );
			assert.strictEqual( colors.red.order, 2 );

			assert.property( colors.yellow, "order" );
			assert.strictEqual( colors.yellow.order, 1 );

			assert.property( colors.green, "order" );
			assert.strictEqual( colors.green.order, 0 );
		} );
	} );

	it( "should throw if reserved words are used as props", function() {
		assert.throws( function() {
			Enum( {
				foo: {
					value: 1337,
					is: "bar"
				}
			} );
		} );

		assert.throws( function() {
			Enum( {
				foo: {
					value: 1337,
					has: "bar"
				}
			} );
		} );
	} );
} );
