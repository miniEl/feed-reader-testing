/* feedreader.js */

$(function() {
    /* Test suite just contains for the RSS
       feeds definitions, the allFeeds variable in the application */
    describe('RSS Feeds', function() {

        /* Check that all feeds are defined, and not empty */
        it('Feeds are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* Check that all feeds urls are defined, not empty, and of type string */
        it('Have defined urls', function() {
            for (let feed of allFeeds) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
                expect(feed.url.constructor).toBe(String);
            }
        });

        /* Check that all feeds names are defined, and not empty */
        it('Have defined names', function() {
            for (let feed of allFeeds) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            }
        });
    });

    /* Test suite named "The menu" */
    describe('The menu', function() {

        /* Check that the menu element is hidden by default */
        it('Menu element is hidden', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

        /* Check if the menu toggles when the menu icon is clicked */
        it('Menu element toggle when clicked', function() {
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(false);
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });

    /* Test suite named "Initial Entries" */
    describe('Initial Entries', function() {

        /* Check that when the loadFeed function is called and completes its work, 
        there is at least a single .entry element within the .feed container */
        beforeEach(function(done) {
            loadFeed(0, done);
        });

        it('Feed container has at least one entry', function() {
            let feedContainer = document.querySelector('.feed');
            expect(feedContainer.children.length).toBeGreaterThan(0);
        });
    });

    /* Test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {

        /* Check that when a new feed is loaded by the loadFeed function 
        that the content actually changes Remember */
        let firstFeed, lastFeed;
        beforeEach(function(done) {
            loadFeed(0, function() {
                firstFeed = $('.feed').html();
                loadFeed(1, function() {
                    lastFeed = $('.feed').html();
                    done();
                });
            });
        });

        it('New feed changes content', function() {
            expect(firstFeed).not.toBe(lastFeed);
        });
    });
}());
