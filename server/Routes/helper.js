const Code = require("../Models/Code");

//UPDATE  adriatictraveljournaldb.codes SET FK_userId=null AND activated=false WHERE id=279 ;

Code.update(
  {
    FK_userId: null,
    activated: false
  },
  {
    where: {
      activated: true
    }
  }
);
