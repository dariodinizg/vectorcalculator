class VectorCalculator{
    /* All vectors in the class uses the canonical i = (1,0) and j = (0,1)
    */

    add_vectors(vectorA, vectorB){
        return {
            'x': (vectorA.x + vectorB.x),
            'y': (vectorA.y + vectorB.y)
        }
    }
    
    subtract_twoVectors(vector1, vector2){
        // Abstract logic, since there are no subtract operation between vectors.
        // It only adds the first with the oposite vector of the last

        if (this._is_sameDimension) {
            let resultVector = {}
            Object.keys(vector1).forEach(coordinate => {
                resultVector[coordinate] = vector1[coordinate]
            })
        
            Object.keys(vector2).forEach(coordinate => {
                resultVector[coordinate] -= vector2[coordinate]
            })
            }
        return resultVector
        }
    
    scale_vector(vector, scalar){
        // Multiply all coordinates of the vector by a scalar
        let scaledVector = {}
        
        Object.keys(vector).forEach(coordinate => {
            scaledVector[coordinate] = scalar * vector[coordinate]
        })
        return scaledVector
    }

    multiply_vectorProduct(vectors_array){
        if (vectors_array.length === 2){
            if (Object.keys(vectors_array[0]).length === 3) {
                if (this._is_sameDimension(vectors_array)){
                    let v1 = vectors_array[0]
                    let v2 = vectors_array[1]
                    return {
                        'x': (v1.y*v2.z - v2.y*v1.z),
                        'y': (v2.x*v1.z - v1.x*v2.z),
                        'z': (v1.x*v2.y - v2.x*v1.y),
                    }
                }
            }
            else {
                console.log("Os vetores precisam pertencer ao espaço R3")
            }
        }
        else {
            console.log("Esta função recebe dois vetores")
        }
    }

    multiply_scalarProduct(vectors_array, show_typeAngle=false){
        if (this._is_sameDimension(vectors_array)) {
            let products = {}
            let result = 0
            Object.keys(vectors_array[0]).forEach(element => {
                products[`${Object.keys(vectors_array[0]).indexOf(element)}`] = 1
            });
            for (let index = 0; index < vectors_array.length; index++){
                let current_point = vectors_array[index]
                Object.keys(current_point).forEach(coordinate => {
                    let coordinate_index = Object.keys(current_point).indexOf(coordinate)
                    products[`${coordinate_index}`] *= current_point[coordinate]
                    }
                )
            }
            Object.keys(products).forEach(element => {
                result += products[element]
            })
            return result
        }
        if (show_typeAngle){
            let type_angle

            if (result === 0)
            {
                type_angle = "reto"
            }
            else if (result > 0) 
            {
                type_angle = "agudo"
            }
            else 
            {
                type_angle = "obtuso"
            }
            
 
            return result, type_angle
        }
    }
    
    get_vectorFromTwoPoints(origin_point, destiny_point){
        
        if (this._is_sameDimension([origin_point, destiny_point])) {
            let resultVector = {}
            Object.keys(origin_point).forEach(coordinate => {
                resultVector[coordinate] = origin_point[coordinate]
            })
            Object.keys(destiny_point).forEach(coordinate => {
                resultVector[coordinate] -= destiny_point[coordinate]
            })
            return resultVector
        }
    }
    
    get_vectorModule(vector){
        let result = 0
        Object.keys(vector).forEach(element => {
            result += vector[element] ** 2
        })
        return Math.abs(result ** (1/2))
    }
    
    get_vectorCoordinates(vector_module, angle, is_radians=false){
        if (is_radians != true){
            angle *= (Math.PI/180)
        }
        console.log(angle)
        return {
            'x': Math.round(vector_module*Math.cos(angle)),
            'y': Math.round(vector_module*Math.sin(angle)),
        }
    }

    get_opositeVector(vector){
        let opositVector = {}
        
        Object.keys(vector).forEach(coordinate => {
            opositVector[coordinate] = vector[coordinate] * -1
        })
        return opositVector
    }

    get_versor(vector){
        let vector_module = this.get_vectorModule(vector)
        return {
            'x': vector.x/vector_module,
            'y': vector.y/vector_module
        }
    }

    get_colinearPoint(x_origin=0, y_origin=0, x_destiny, y_destiny, given_x){
        /* Return the Y value for a given X that belongs to the line of two 
        known points (x_origin, x_destiny, y_origin, y_destiny) */
        
        var co_a = get_angularCoeficient(x_origin, y_origin, x_destiny, y_destiny)
        var y = (co_a * (given_x - x_origin)) + y_origin
        return y
    }
    
    get_angularCoeficient(x_origin, y_origin, x_destiny, y_destiny){
        var co_angular = (y_destiny - y_origin)/(x_destiny - x_origin)
        return co_angular
    }

    get_distanceTwoPoins(vectors_array) {
        let coordinates_square = {}
        
        if (this._is_sameDimension){
            let vector1 = vectors_array[0]
            let vector2 = vectors_array[1]
            

            // Build a default object with 0 values to its keys
            Object.keys(vector1).forEach(coordinate => {
                coordinates_square[coordinate] = vector1[coordinate]
            })
            
            Object.keys(vector2).forEach(coordinate =>{
                coordinates_square[coordinate] -= vector2[coordinate]
            })
            
            
        }
        return coordinates_square
    }

    _is_sameDimension(vectors_array){
        // Check if all vectors in the array belongs to the same space
        
        let vector_shapes = []
            for (let index = 0; index < vectors_array.length; index++){
                let element = vectors_array[index]
                vector_shapes.push(Object.keys(element).length)
            }
            if (new Set(vector_shapes).size === 1){
                return true
            }
            else {
                console.log("Os vetores precisam pertencer ao mesmo espaço")
                return false
            }
        }
}
 
// Export statement for Nodejs
module.exports = VectorCalculator