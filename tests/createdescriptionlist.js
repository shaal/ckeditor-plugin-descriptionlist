'use strict';

suite( 'Description list - creation from blocks' );

test( 'on a single paragraph', function() {
	tests.setHtmlWithSelection( '<p>[]foo</p>' );
	tests.editor.execCommand( 'descriptionList' );
	assert.areSame( '<dl><dt>[]foo</dt></dl>', tests.getHtmlWithSelection() );
} );

test( 'on a single paragraph between paragraphs', function() {
	tests.setHtmlWithSelection( '<p>x</p><p>[]foo</p><p>y</p>' );
	tests.editor.execCommand( 'descriptionList' );
	assert.areSame( '<p>x</p><dl><dt>[]foo</dt></dl><p>y</p>', tests.getHtmlWithSelection() );
} );

test( 'on a single h1', function() {
	tests.setHtmlWithSelection( '<p>x</p><h1>[]foo</h1><p>x</p>' );
	tests.editor.execCommand( 'descriptionList' );
	assert.areSame( '<p>x</p><dl><dt>[]foo</dt></dl><p>x</p>', tests.getHtmlWithSelection() );
} );

test( 'on two paragraphs', function() {
	tests.setHtmlWithSelection( '<p>x</p><p>[foo</p><p>bar]</p><p>x</p>' );
	tests.editor.execCommand( 'descriptionList' );
	assert.areSame( '<p>x</p><dl><dt>[foo</dt><dd>bar]</dd></dl><p>x</p>', tests.getHtmlWithSelection() );
} );

test( 'on four not fully selected paragraphs', function() {
	tests.setHtmlWithSelection( '<p>x</p><p>p[1</p><p>p2</p><p>p3</p><p>p]4</p><p>x</p>' );
	tests.editor.execCommand( 'descriptionList' );
	assert.areSame( '<p>x</p><dl><dt>p[1</dt><dd>p2</dd><dt>p3</dt><dd>p]4</dd></dl><p>x</p>',
		tests.getHtmlWithSelection() );
} );


suite( 'Description list - creation from lists' );

test( 'on a single list item', function() {
	tests.setHtmlWithSelection( '<ul><li>[]foo</li></ul>' );
	tests.editor.execCommand( 'descriptionList' );
	assert.areSame( '<dl><dt>[]foo</dt></dl>', tests.getHtmlWithSelection() );
} );

test( 'on a single list item between other items', function() {
	tests.setHtmlWithSelection( '<ul><li>x</li><li>[]foo</li><li>y</li></ul>' );
	tests.editor.execCommand( 'descriptionList' );
	assert.areSame( '<ul><li>x</li></ul><dl><dt>[]foo</dt></dl><ul><li>y</li></ul>',
		tests.getHtmlWithSelection() );
} );

test( 'on two list items', function() {
	tests.setHtmlWithSelection( '<p>x</p><ul><li>[foo</li><li>bar]</li></ul><p>y</p>' );
	tests.editor.execCommand( 'descriptionList' );
	assert.areSame( '<p>x</p><dl><dt>[foo</dt><dd>bar]</dd></dl><p>y</p>',
		tests.getHtmlWithSelection() );
} );

test( 'on two list items between other items', function() {
	tests.setHtmlWithSelection( '<ul><li>x</li><li>[foo</li><li>bar]</li><li>y</li></ul>' );
	tests.editor.execCommand( 'descriptionList' );
	assert.areSame( '<ul><li>x</li></ul><dl><dt>[foo</dt><dd>bar]</dd></dl><ul><li>y</li></ul>',
		tests.getHtmlWithSelection() );
} );

test( 'on a paragraph inside a list item', function() {
	tests.setHtmlWithSelection( '<ul><li>x</li><li><p>[]foo</p></li><li>y</li></ul>' );
	tests.editor.execCommand( 'descriptionList' );
	assert.areSame( '<ul><li>x</li></ul><dl><dt>[]foo</dt></dl><ul><li>y</li></ul>',
		tests.getHtmlWithSelection() );
} );

test( 'on two paragraphs inside a single list item', function() {
	tests.setHtmlWithSelection( '<ul><li>x</li><li><p>[foo</p><p>bar]</p></li><li>y</li></ul>' );
	tests.editor.execCommand( 'descriptionList' );
	assert.areSame( '<ul><li>x</li></ul><dl><dt>[foo</dt><dd>bar]</dd></dl><ul><li>y</li></ul>',
		tests.getHtmlWithSelection() );
} );

test( 'on two blocks inside two list items', function() {
	tests.setHtmlWithSelection( '<ul><li>x</li><li><h1>[foo</h1></li><li><p>bar]</p></li><li>y</li></ul>' );
	tests.editor.execCommand( 'descriptionList' );
	assert.areSame( '<ul><li>x</li></ul><dl><dt>[foo</dt><dd>bar]</dd></dl><ul><li>y</li></ul>',
		tests.getHtmlWithSelection() );
} );

test( 'on list items between blocks', function() {
	tests.setHtmlWithSelection( '<p>x</p><p>[p1</p><ul><li>l1</li><li>l2</li></ul><p>p2]</p><p>y</p>' );
	tests.editor.execCommand( 'descriptionList' );
	assert.areSame( '<p>x</p><dl><dt>[p1</dt><dd>l1</dd><dt>l2</dt><dd>p2]</dd></dl><p>y</p>',
		tests.getHtmlWithSelection() );
} );


suite( 'Description list - creation from mixed content' );

test( 'on a list between paragraphs', function() {
	tests.setHtmlWithSelection( '<p>x</p><p>[foo</p><ul><li>bar</li></ul><p>bom]</p><p>x</p>' );
	tests.editor.execCommand( 'descriptionList' );
	assert.areSame( '<p>x</p><dl><dt>[foo</dt><dd>bar</dd><dt>bom]</dt></dl><p>x</p>', tests.getHtmlWithSelection() );
} );

test( 'on a paragraph between lists', function() {
	tests.setHtmlWithSelection( '<ul><li>x</li><li>f[oo</li></ul><p>bar</p><ol><li>bo]m</li><li>x</li></ol>' );
	tests.editor.execCommand( 'descriptionList' );
	assert.areSame( '<ul><li>x</li></ul><dl><dt>f[oo</dt><dd>bar</dd><dt>bo]m</dt></dl><ol><li>x</li></ol>',
		tests.getHtmlWithSelection() );
} );

test( 'on list after paragraph', function() {
	tests.setHtmlWithSelection( '<p>x</p><p>[foo</p><ul><li>bar</li><li>bom]</li><li>bim</li></ul><p>x</p>' );
	tests.editor.execCommand( 'descriptionList' );
	assert.areSame( '<p>x</p><dl><dt>[foo</dt><dd>bar</dd><dt>bom]</dt></dl><ul><li>bim</li></ul><p>x</p>',
		tests.getHtmlWithSelection() );
} );