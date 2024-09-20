import formula from '../assets/formula.json';
import { FormState } from '../context/FormState';
import * as math from 'mathjs';

export interface InputEstimate {
	intercept: number;
	regionalSwitzerland: number;
	bespokeStandard: number;
	bespokeHighEnd: number;
	employeesCount: number;
	processLeadingPersonnel: number;
	partnersCount: number;
	locationNumber: number;
	revenuePerYear: number;
	operatingCostsPerYear: number;
}

interface OutputData {
	estimate: InputEstimate;
	range: number[];
	matrix: number[][];
	tValue: number;
}

interface FormulaType {
	[outputIdentifier: string]: OutputData;
}

interface CalculateOutputProps {
	outputIdentifier: string;
	input: FormState;
}

const calculateOutput = ({ outputIdentifier, input }: CalculateOutputProps): void => {
	const estimateVector = (formula as FormulaType)[outputIdentifier].estimate;

	// Calculate Ouput Estimate based on exponential Function

	const regionalSwitzerland = input.locationType === 'regionalSwitzerland' ? 1 : 0;
	const bespokeStandard = input.serviceType === 'bespokeStandard' ? 1 : 0;
	const bespokeHighEnd = input.serviceType === 'bespokeHighEnd' ? 1 : 0;

	const x_Vector = [
		estimateVector.intercept,
		regionalSwitzerland,
		bespokeStandard,
		bespokeHighEnd,
		parseFloat(input.employeesCount),
		parseFloat(input.processLeadingPersonnel),
		parseFloat(input.partnersCount),
		parseFloat(input.locationNumber),
		parseFloat(input.revenuePerYear),
		parseFloat(input.operatingCostsPerYear),
	];

	const estimateArray = Object.values(estimateVector);

	const sumTerm = math.multiply(x_Vector.slice(1), estimateArray.slice(1));

	const outputEstimateResult = Math.exp(estimateVector.intercept + sumTerm);

	console.log(outputEstimateResult, estimateArray, x_Vector);

	// Calculate Confidence Intervall

	// Covariance matrix (Sigma) from the formula file
	const sigmaMatrix = (formula as FormulaType)[outputIdentifier].matrix;

	// Transpose the x_Vector
	const x_Vector_T = math.transpose(x_Vector);

	// Perform the matrix multiplication: x_Vector_T * Sigma * x_Vector
	const multiplicationResult = math.multiply(math.multiply(x_Vector_T, sigmaMatrix), x_Vector);

	// Ensure the result is a scalar, not an array
	let scalarResult: number;
	if (Array.isArray(multiplicationResult)) {
		// Wenn das Ergebnis ein Array oder Matrix ist, extrahieren Sie das erste Element
		scalarResult = multiplicationResult[0] as number;
	} else {
		// Andernfalls ist es bereits eine Zahl
		scalarResult = multiplicationResult as number;
	}


	// Calculate the square root
	const sqrtResult = math.sqrt(scalarResult) as number;

	const t_Value = (formula as FormulaType)[outputIdentifier].tValue;

	const CI_lower = outputEstimateResult - t_Value * sqrtResult;
	const CI_upper = outputEstimateResult + t_Value * sqrtResult;

	console.log(CI_lower, CI_upper);
};

export default calculateOutput;