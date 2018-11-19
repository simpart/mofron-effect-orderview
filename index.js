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
            this.prmMap(['timeDiff']);
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
                    this.timeDiff() * (parseInt(cidx) + 1),
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
                    this.timeDiff() * (parseInt(cidx) + 1),
                    chd[cidx]
                );
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * time diff setter/getter
     * default time diff is 100 ms
     *
     * @param p1 (number) order time diff (ms)
     * @param p1 (undefined) call as getter
     * @return (number) order time diff (ms)
     */
    timeDiff (prm) {
        try { return this.member('timeDiff', 'number', prm, 100); } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
module.exports = mofron.effect.OrderView;
/* end of file */
