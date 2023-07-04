import ldap, { SearchOptions, SearchResultDone } from 'ldapjs';

const client = ldap.createClient({
    url: ['ldap://127.0.0.1:1389', 'ldap://127.0.0.2:1389']
});

client.on('connectError', (err) => {
    // handle connection error

    console.error('connectError --> ', err);
})

client.bind('cn=root', 'secret', (err) => {
    if (err) { console.error('bindError --> ', err); }
});

const opts: SearchOptions = {
    filter: '(&(l=Seattle)(email=*@foo.com))',
    scope: 'sub',
    attributes: ['dn', 'sn', 'cn']
};

client.search('o=example', opts, (err, res) => {
    if (err) { console.error('searchError --> ', err); }

    res.on('searchRequest', (searchRequest) => {
        console.log('searchRequest: ', searchRequest.messageId);
    });
    res.on('searchEntry', (entry) => {
        console.log('entry: ' + JSON.stringify(entry.pojo));
    });
    res.on('searchReference', (referral) => {
        console.log('referral: ' + referral.uris.join());
    });
    res.on('error', (err) => {
        console.error('error: ' + err.message);
    });
    res.on('end', (result: SearchResultDone) => {
        console.log('status: ' + result.status);
    });
});