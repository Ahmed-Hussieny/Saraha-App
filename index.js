import app from '../SarahaApp/src/app.js';

app.listen(process.env.PORT, () => {
    console.log(`Server on port ${process.env.PORT}`);
});
