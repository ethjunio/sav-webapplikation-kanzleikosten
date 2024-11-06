import formula from '../assets/formula.json';
import staticResultValues from '../assets/staticResultValues.json';
import { FormState } from '../context/FormState';
import * as math from 'mathjs';
import { roundTo } from './roundTo';

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
	mean: number;
	median: number;
	estimate: InputEstimate;
	range: number[];
	matrix: number[][];
	tValue: number;
}

interface FormulaType {
	[outputIdentifier: string]: OutputData;
}

interface StaticResultType {
	[outputIdentifier: string]: {
		mean: number;
		median: number;
		q25: number;
		q75: number;
	};
}

export interface CalculateOutputProps {
	outputIdentifier: string;
	input: FormState;
}

// Discriminated Union Interfaces
export interface EstimateWithConfidence {
	type: 'confidence' | 'outOfRange';
	estimatedCost: number;
	CI_lower: number;
	CI_upper: number;
}

export interface EstimateWithStatistics {
	type: 'statistics';
	estimatedCost: number;
	mean: number;
	q25: number;
	q75: number;
}

export type FunctionReturn = EstimateWithConfidence | EstimateWithStatistics;

const calculateOutput = ({ outputIdentifier, input }: CalculateOutputProps): FunctionReturn => {
	const estimateVector = (formula as FormulaType)[outputIdentifier]?.estimate;

	if (estimateVector !== undefined) {
		// Calculate Output Estimate based on exponential Function

		const regionalSwitzerland = input.locationType === 'regionalSwitzerland' ? 1 : 0;
		const bespokeStandard = input.serviceType === 'bespokeStandard' ? 1 : 0;
		const bespokeHighEnd = input.serviceType === 'bespokeHighEnd' ? 1 : 0;

		const x_Vector = [
			1,
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

		const sumTerm = math.multiply(x_Vector, estimateArray);

		const outputEstimateResult = Math.exp(sumTerm);

		// Calculate Confidence Interval

		// Covariance matrix (Sigma) from the formula file
		const sigmaMatrix = (formula as FormulaType)[outputIdentifier].matrix;

		// Transpose the x_Vector
		const x_Vector_T = math.transpose(x_Vector);

		// Perform the matrix multiplication: x_Vector_T * Sigma * x_Vector
		const multiplicationResult = math.multiply(math.multiply(x_Vector_T, sigmaMatrix), x_Vector);

		// Ensure the result is a scalar, not an array
		let scalarResult: number;
		if (Array.isArray(multiplicationResult)) {
			scalarResult = multiplicationResult[0] as number;
		} else {
			scalarResult = multiplicationResult as number;
		}

		// Calculate the square root
		const sqrtResult = math.sqrt(scalarResult) as number;
		const t_Value = (formula as FormulaType)[outputIdentifier].tValue;

		const CI_lower = outputEstimateResult - t_Value * sqrtResult;
		const CI_upper = outputEstimateResult + t_Value * sqrtResult;

		// Read the Range
		const range = (formula as FormulaType)[outputIdentifier].range;

		// Return with discriminant
		if (outputEstimateResult >= range[0] && outputEstimateResult <= range[1]) {
			return {
				type: 'confidence',
				estimatedCost: roundTo(outputEstimateResult, 0),
				CI_lower: roundTo(CI_lower, 2),
				CI_upper: roundTo(CI_upper, 2),
			};
		} else {
			return {
				type: 'statistics',
				estimatedCost: (formula as FormulaType)[outputIdentifier]?.median,
				mean: (formula as FormulaType)[outputIdentifier]?.mean,
				q25: 0,
				q75: 0,
			};
		}
	} else {
		const staticResultVector = (staticResultValues as StaticResultType)[outputIdentifier];

		// Return with discriminant
		return {
			type: 'statistics',
			estimatedCost: staticResultVector.median,
			mean: staticResultVector.mean,
			q25: staticResultVector.q25,
			q75: staticResultVector.q75,
		};
	}
};

export default calculateOutput;
