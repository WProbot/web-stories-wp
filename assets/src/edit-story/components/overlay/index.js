/**
 * External dependencies
 */
import styled from 'styled-components';

/**
 * WordPress dependencies
 */
import { forwardRef, useContext, createPortal } from '@wordpress/element';

/**
 * Internal dependencies
 */
import PointerEventsCss from '../../utils/pointerEventsCss';
import Context from './context';

const Wrapper = styled.div`
  ${ PointerEventsCss }
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 0;
  z-index: ${ ( { zIndex } ) => `${ zIndex }` };
`;

function InOverlayWithRef( { zIndex, pointerEvents, render, children }, ref ) {
	const { container, overlay } = useContext( Context );
	if ( ! container || ! overlay ) {
		return null;
	}
	const slot = (
		<Wrapper
			ref={ ref }
			zIndex={ zIndex || 0 }
			pointerEvents={ pointerEvents }
			onMouseDown={ ( evt ) => evt.stopPropagation() }>
			{ render ? render( { container, overlay } ) : children }
		</Wrapper>
	);
	return createPortal( slot, overlay );
}

const InOverlay = forwardRef( InOverlayWithRef );

export default InOverlay;