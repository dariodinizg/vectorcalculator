# Simple JS Module for math involving vectors

## Methods
* add_vectors
* subtract_twoVectors
* scale_vector
* multiply_scalarProduct
* multiply_vectorProduct
* get_vectorFromTwoPoints
* get_vectorModule
* get_vectorCoordinates
* get_opositeVector
* get_colinearPoint
* get_versor
* get_angularCoeficient
* get_distanceTwoPoints

## How to use

Import it in your js script and instantiate with no parameters.

The vectors must be passed as nested objects like:

// for R2 space
var your_points = {
	vectorA = {
	  'x': value_x,
	  'y': value_y
	},
}

// for R3 space
var your_points = {
	vectorA = {
	  'x': value_x,
	  'y': value_y,
	  'z': value_z
	}
}
