import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { predictRisk, getOccupations, getRiskMatrix, healthCheck } from '../api/scoring';
export const usePredictRisk = () => {
    return useMutation({
        mutationFn: predictRisk,
        onSuccess: (data) => {
            console.log('Prediction successful:', data);
        },
        onError: (error) => {
            console.error('Prediction failed:', error);
        },
    });
};
export const useOccupations = () => {
    return useQuery({
        queryKey: ['occupations'],
        queryFn: getOccupations,
        staleTime: 1000 * 60 * 60, 
        cacheTime: 1000 * 60 * 60 * 24, 
    });
};
export const useRiskMatrix = () => {
    return useQuery({
        queryKey: ['riskMatrix'],
        queryFn: getRiskMatrix,
        staleTime: 1000 * 60 * 60, 
        cacheTime: 1000 * 60 * 60 * 24, 
    });
};
export const useHealthCheck = (enabled = true) => {
    return useQuery({
        queryKey: ['healthCheck'],
        queryFn: healthCheck,
        enabled, 
        refetchInterval: 30000, 
        retry: 3,
    });
};
export const useRiskPrediction = (options = {}) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: predictRisk,
        onSuccess: (data) => {
            queryClient.invalidateQueries(['predictions']);
            if (options.onSuccess) {
                options.onSuccess(data);
            }
        },
        onError: (error) => {
            if (options.onError) {
                options.onError(error);
            }
        },
        ...options,
    });
};
