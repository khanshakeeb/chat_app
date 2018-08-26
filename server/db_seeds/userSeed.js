//User seed data for the applicaiton
const seeder = require('mongoose-seed');
const dbConfig = require('../app/config/database');

seeder.connect(dbConfig.url, function() {
  seeder.loadModels([
    './app/models/user' 
  ]);

seeder.clearModels(['User'], function() {
    seeder.populateModels(_generateUserData(), function(response) {
        console.log("response after populate data", response);
      seeder.disconnect();
    });
 
  });
});



/**
 * factory method which generate sample datasets for users
 */
function _generateUserData(){
    const passwordHash = "$2a$08$UfVT.NM8I7co0dLa.O.PmOY7vVdxddc6zbguG.f2nv1QlukOSblQy";// 123456
    let users = [];
    for(i=1; i<= 5; i++){
        users.push({
            email: `dummy_user_${i}@test.com`,
            firstName: `dummy first name ${i}`,
            password: passwordHash,
            lastName: `dummy last name ${i}`,
            phone: `+9283838338`,
            displayName: `dummy display name ${i}`,
            aboutMe: `dummy about me ${i}`,
            isActive: true,
            isOnline: true
        });
    }
    const data = [
        {
            'model': 'User',
            'documents': users
        }
    ];
    
    return data;
}