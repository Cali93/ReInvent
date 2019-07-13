'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`INSERT INTO users(first_name, last_name, email, gender, avatar, office_id, created_at, updated_at) values
    ('Winny','Mundell','wmundell0@symantec.com','female','https://robohash.org/etdoloremmagnam.png?size=512x512&set=set1', 1, '2019-01-08', '2019-01-08'),
    ('Scott','Hauxby','shauxby1@aboutads.info','male','https://robohash.org/sapientecommodinihil.png?size=512x512&set=set1', 1, '2019-01-08', '2019-01-08'),
    ('Jan','Sturm','jsturm2@cafepress.com','female','https://robohash.org/eumvoluptassunt.png?size=512x512&set=set1', 1, '2019-01-08', '2019-01-08'),
    ('Julianne','Finnan','jfinnan3@stumbleupon.com','female','https://robohash.org/laborumetrerum.png?size=512x512&set=set1', 1, '2019-01-08', '2019-01-08'),
    ('Keefer','Bradneck','kbradneck4@geocities.jp','male','https://robohash.org/utnihilin.bmp?size=512x512&set=set1', 1, '2019-01-08', '2019-01-08'),
    ('Hedvige','Showl','hshowl5@163.com','female','https://robohash.org/animiistenihil.jpg?size=512x512&set=set1', 1, '2019-01-08', '2019-01-08'),
    ('Levon','Dobbings','ldobbings6@reference.com','male','https://robohash.org/laboriosamvoluptatesasperiores.bmp?size=512x512&set=set1', 1, '2019-01-08', '2019-01-08'),
    ('Hermon','Egger','hegger7@t.co','male','https://robohash.org/voluptatemdoloribusenim.jpg?size=512x512&set=set1', 1, '2019-01-08', '2019-01-08'),
    ('Conan','Jacobs','cjacobs8@sohu.com','male','https://robohash.org/quodistinctiomaiores.bmp?size=512x512&set=set1', 1, '2019-01-08', '2019-01-08'),
    ('Hugo','Macauley','hmacauley9@cargocollective.com','male','https://robohash.org/repellataliaset.png?size=512x512&set=set1', 1, '2019-01-08', '2019-01-08'),
    ('Tadeas','Slides','tslidesa@amazon.co.uk','male','https://robohash.org/animivelquasi.png?size=512x512&set=set1', 1, '2019-01-08', '2019-01-08'),
    ('Saundra','Do Rosario','sdorosariob@tinyurl.com','male','https://robohash.org/illumametblanditiis.bmp?size=512x512&set=set1', 1, '2019-01-08', '2019-01-08'),
    ('Barbie','Brownsea','bbrownseac@salon.com','female','https://robohash.org/consequunturnesciuntest.jpg?size=512x512&set=set1', 1, '2019-01-08', '2019-01-08'),
    ('Bria','Tuffin','btuffind@yandex.ru','female','https://robohash.org/voluptatemsitquidem.png?size=512x512&set=set1', 1, '2019-01-08', '2019-01-08'),
    ('Devon','Sorrel','dsorrele@whitehouse.gov','female','https://robohash.org/solutanemoet.bmp?size=512x512&set=set1', 2, '2019-01-08', '2019-01-08'),
    ('Ileana','Jellard','ijellardf@state.tx.us','female','https://robohash.org/quidoloresmaxime.png?size=512x512&set=set1', 2, '2019-01-08', '2019-01-08'),
    ('Bridget','St Ledger','bstledgerg@icio.us','female','https://robohash.org/necessitatibussedtemporibus.jpg?size=512x512&set=set1', 2, '2019-01-08', '2019-01-08'),
    ('Craggy','Linzee','clinzeeh@ehow.com','male','https://robohash.org/quaesapienteporro.png?size=512x512&set=set1', 2, '2019-01-08', '2019-01-08'),
    ('Hamilton','Lorkins','hlorkinsi@newyorker.com','male','https://robohash.org/idaliquidminima.bmp?size=512x512&set=set1', 2, '2019-01-08', '2019-01-08'),
    ('Cherye','Fairall','cfairallj@apache.org','female','https://robohash.org/suntevenietitaque.jpg?size=512x512&set=set1', 2, '2019-01-08', '2019-01-08'),
    ('Hersch','Hulkes','hhulkesk@wsj.com','male','https://robohash.org/voluptatequiut.bmp?size=512x512&set=set1', 2, '2019-01-08', '2019-01-08'),
    ('Reynold','Coleborn','rcolebornl@alexa.com','male','https://robohash.org/autilloaperiam.png?size=512x512&set=set1', 2, '2019-01-08', '2019-01-08'),
    ('Mark','Dutch','mdutchm@meetup.com','male','https://robohash.org/modiimpeditquaerat.jpg?size=512x512&set=set1', 2, '2019-01-08', '2019-01-08'),
    ('Deeann','Braunes','dbraunesn@wunderground.com','female','https://robohash.org/etnonsit.bmp?size=512x512&set=set1', 2, '2019-01-08', '2019-01-08'),
    ('Willi','Scarlett','wscarletto@wikipedia.org','female','https://robohash.org/voluptasdelectuseum.bmp?size=512x512&set=set1', 2, '2019-01-08', '2019-01-08'),
    ('Kacey','Crinidge','kcrinidgep@flavors.me','female','https://robohash.org/laboriosamadipiscidebitis.jpg?size=512x512&set=set1', 2, '2019-01-08', '2019-01-08'),
    ('Marlon','Rowlstone','mrowlstoneq@ameblo.jp','male','https://robohash.org/aperiamnullaomnis.jpg?size=512x512&set=set1', 2, '2019-01-08', '2019-01-08'),
    ('Glynnis','Le feaver','glefeaverr@1688.com','female','https://robohash.org/perspiciatisetcorporis.bmp?size=512x512&set=set1', 3, '2019-01-08', '2019-01-08'),
    ('Cece','Pinor','cpinors@mapy.cz','male','https://robohash.org/aliquametipsa.bmp?size=512x512&set=set1', 3, '2019-01-08', '2019-01-08'),
    ('Lewie','MacGahey','lmacgaheyt@cargocollective.com','male','https://robohash.org/molestiaequiperspiciatis.png?size=512x512&set=set1', 3, '2019-01-08', '2019-01-08'),
    ('Otto','Lindenbaum','olindenbaumu@google.com','male','https://robohash.org/veritatisnisidolore.png?size=512x512&set=set1', 3, '2019-01-08', '2019-01-08'),
    ('Carry','Hammerberger','chammerbergerv@bigcartel.com','female','https://robohash.org/cumquidemquae.bmp?size=512x512&set=set1', 3, '2019-01-08', '2019-01-08'),
    ('Arly','Shinner','ashinnerw@indiegogo.com','female','https://robohash.org/consequunturetrerum.bmp?size=512x512&set=set1', 3, '2019-01-08', '2019-01-08'),
    ('Edeline','Deare','edearex@hubpages.com','female','https://robohash.org/sequiquiest.jpg?size=512x512&set=set1', 3, '2019-01-08', '2019-01-08'),
    ('Filia','Tilmouth','ftilmouthy@yandex.ru','female','https://robohash.org/estvelitplaceat.bmp?size=512x512&set=set1', 3, '2019-01-08', '2019-01-08'),
    ('Maryrose','Kerkham','mkerkhamz@mediafire.com','female','https://robohash.org/utvoluptatemdelectus.bmp?size=512x512&set=set1', 3, '2019-01-08', '2019-01-08'),
    ('Cahra','Bearblock','cbearblock10@over-blog.com','female','https://robohash.org/nemoconsequaturtemporibus.png?size=512x512&set=set1', 3, '2019-01-08', '2019-01-08'),
    ('Andrew','Druce','adruce11@typepad.com','male','https://robohash.org/quidemataliquid.png?size=512x512&set=set1', 3, '2019-01-08', '2019-01-08'),
    ('Othilia','Quadling','oquadling12@a8.net','female','https://robohash.org/sintdolorelaudantium.jpg?size=512x512&set=set1', 3, '2019-01-08', '2019-01-08'),
    ('Joye','Pitrasso','jpitrasso13@weather.com','female','https://robohash.org/sapienteautvitae.png?size=512x512&set=set1', 3, '2019-01-08', '2019-01-08'),
    ('Andonis','Side','aside14@berkeley.edu','male','https://robohash.org/autemquiaenim.bmp?size=512x512&set=set1', 3, '2019-01-08', '2019-01-08'),
    ('Brantley','Clarae','bclarae15@istockphoto.com','male','https://robohash.org/consequaturmodirepudiandae.jpg?size=512x512&set=set1', 3, '2019-01-08', '2019-01-08'),
    ('Reena','Plinck','rplinck16@51.la','female','https://robohash.org/sapientequised.png?size=512x512&set=set1', 3, '2019-01-08', '2019-01-08'),
    ('Adah','Cossins','acossins17@google.de','female','https://robohash.org/ametenimet.png?size=512x512&set=set1', 3, '2019-01-08', '2019-01-08'),
    ('Caro','Lidington','clidington18@devhub.com','female','https://robohash.org/quisvoluptatemaut.jpg?size=512x512&set=set1', 3, '2019-01-08', '2019-01-08'),
    ('Sandie','Ilyukhov','silyukhov19@vkontakte.ru','female','https://robohash.org/estdoloredolorum.jpg?size=512x512&set=set1', 4, '2019-01-08', '2019-01-08'),
    ('Eirena','Kobiera','ekobiera1a@timesonline.co.uk','female','https://robohash.org/molestiaevoluptatemquam.jpg?size=512x512&set=set1', 4, '2019-01-08', '2019-01-08'),
    ('Pammi','Antoniewicz','pantoniewicz1b@fastcompany.com','female','https://robohash.org/autemvoluptatemreprehenderit.jpg?size=512x512&set=set1', 4, '2019-01-08', '2019-01-08'),
    ('Galen','Westmarland','gwestmarland1c@google.cn','male','https://robohash.org/nondoloribusnulla.png?size=512x512&set=set1', 4, '2019-01-08', '2019-01-08'),
    ('Concordia','Crocroft','ccrocroft1d@ihg.com','female','https://robohash.org/rationemaximesunt.bmp?size=512x512&set=set1', 4, '2019-01-08', '2019-01-08');`);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
