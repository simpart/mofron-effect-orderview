/**
 * @file mofron-effect-orderview/index.js
 * @brief order view effect
 * @author simpart
 */
const mf = require('mofron');

mf.effect.OrderView = class extends mf.Effect {
    /**
     * initialize effect
     *
     * @param p1 (number) order time diff (ms)
     * @param p1 (object) effect option
     */
    constructor (po) {
        try {
            super();
            this.name('OrderView');
            this.prmMap(['interval']);
            this.prmOpt(po);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * enable view child component  by order 
     *
     * @note private method
     */
    enable (tgt) {
        try {
            let chd  = tgt.child();
            let tocb = (p1) => {
                try { p1.visible(true); } catch (e) {
                    console.error(e.stack);
                    throw e;
                }
            };
            
            for (let cidx in chd) {
                setTimeout(
                    tocb,
                    this.interval()[0] * (parseInt(cidx) + 1),
                    chd[cidx]
                );
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * disable view child component  by order
     *
     * @note private method
     */
    disable (tgt) {
        try {
            let chd  = tgt.child();
            let tocb = (p1) => {
                try { p1.visible(false); } catch (e) {
                    console.error(e.stack);
                    throw e;
                }
            };
            
            for (let cidx in chd) {
                setTimeout(
                    tocb,
                    this.interval()[1] * (parseInt(cidx) + 1),
                    chd[cidx]
                );
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * interval time setter/getter
     * default time diff is 100 ms
     *
     * @param p1 (number) enable order interval time of (ms)
     * @param p1 (undefined) call as getter
     * @return (array) order interval time [enable, disable]
     */
    interval (prm, dis) {
        try {
            //return this.member('interval', 'number', prm, 100);
            if (undefined === prm) {
                /* getter */
                return (undefined === this.m_intvl) ? [100, 100] : this.m_intvl;
            }
            /* setter */
            if (undefined === this.m_intvl) {
                this.m_intvl = [false, false];
            }
            if (true === Array.isArray(prm)) {
                if ( ('number' !== typeof prm[0]) ||
                     ('number' !== typeof prm[1]) ) {
                    throw new Error('invalid parameter');
                }
                this.m_intvl = [prm[0], prm[1]];
                return;
            }
            
            if ( ('number' === typeof prm) && (undefined === dis) ) {
                this.m_intvl = [prm, prm];
            } else {
                if ('number' === typeof prm) {
                    this.m_intvl[0] = prm;
                }
                if ('number' === typeof dis) {
                    this.m_intvl[1] = dis;
                }
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
module.exports = mofron.effect.OrderView;
/* end of file */
