import { difference, isEmpty, isEqual } from 'lodash';
/**
 * @param claims The value to compare.
 * @param value The other value to compare.
 * @returns {boolean}
 */
export const claimEquals = (claims: string[], value: string[]): boolean => {
  return isEqual(claims, value);
};
/**
 * checking that all values are in a claim.
 * @param claims
 * @param value
 * @returns {boolean}
 */
export const claimIncludes = (claims: string[], value: string[]): boolean => {
  return isEmpty(difference(value, claims));
};
/**
 * checking that all claims are in a value.
 * @param claims
 * @param value
 * @returns {boolean}
 */
export const claimCheck = (claims: string[], value: string[]): boolean => {
  return isEmpty(difference(claims, value));
};
/**
 * checking that at least one of value are in claims.
 * @param claims
 * @param value
 * @returns {boolean}
 */
export const claimOneOf = (claims: string[], value: string[]): boolean => {
  return difference(value, claims).length !== value.length;
};
