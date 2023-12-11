<?php
/**
 * Describes the allowable Enqueue types
 *
 * @package ChoctawNation
 * @since 2.0
 */

namespace ChoctawNation;

/** Allowable Enqueue Types */
enum Enqueue_Type {
	case script;
	case style;
	case both;
}
