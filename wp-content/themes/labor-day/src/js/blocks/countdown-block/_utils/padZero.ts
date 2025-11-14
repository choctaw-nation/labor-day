/**
 * Pads a single digit with a 0
 */
export function padZero( num:number ):string {
	return String( num ).padStart( 2, '0' );
}
